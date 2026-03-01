---
title: "How to Turn a Xiaomi Phone into a VPS with postmarketOS"
date: "2026-02-19"
tags:
  - linux
  - xiaomi
  - vps
topic: DIY-VPS
---

Short guide: run mainline Linux (postmarketOS) on an old Xiaomi, then use it as a low-power server.

## Prerequisites

- Xiaomi phone [supported by postmarketOS](https://wiki.postmarketos.org/wiki/Devices) (e.g. Mi 9T/K20, Poco F1, Redmi 2)
- Bootloader unlocked (Xiaomi often requires Mi account + wait period)
- PC with `fastboot` (and for some devices: `lk2nd`)

## Steps

1. **Check your device** — Open the [device list](https://wiki.postmarketos.org/wiki/Devices), find your codename (e.g. `davinci`, `beryllium`).

2. **Install lk2nd (if required)** — Many Xiaomi devices need the [lk2nd](https://wiki.postmarketos.org/wiki/Lk2nd) bootloader for mainline kernel. Follow the wiki for your device.

3. **Flash postmarketOS** — Download the image for your device from postmarketOS, then:
   ```bash
   fastboot flash boot boot-<variant>.img
   fastboot flash system <device>-<variant>.img
   ```

4. **Boot and enable SSH** — First boot may take a few minutes. Enable SSH (e.g. in Phosh: Settings → SSH) or from console:
   ```bash
   sudo setup-sshd
   ```

5. **Use as VPS** — Connect over Wi‑Fi: `ssh user@<phone-ip>`. Install what you need (nginx, Docker, etc.) with `apk` (Alpine package manager).

## Notes

- postmarketOS is **not production-grade**; fine for homelab/hobby.
- Power use is low (often &lt;10 W); built-in battery helps during outages.
- If your model isn’t listed, porting is possible but advanced.
