#!/bin/bash
tar zcvf jinchi.tar.gz JINCHI
scp jinchi.tar.gz root@120.78.206.170:/tmp
ssh root@120.78.206.170
