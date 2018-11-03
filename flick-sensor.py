#!/usr/bin/env python

import time
import signal
import sys
import flicklib

sleeptime = 0.1
#@flicklib.move()
#def move(x, y, z):
#    print(x, y, z)

@flicklib.flick()
def flick(start, finish):
    if(start == 'west' and finish == 'east'):
        print('RIGHT')
    elif(start == 'east' and finish =='west'):
        print('LEFT')
    elif(start == 'south' and finish == 'north'):
        print('UP')
    else:
        print('DOWN')
    sys.stdout.flush()
    time.sleep(sleeptime)

@flicklib.airwheel()
def airwheel(delta):
    print("AIRWHEEL")
    sys.stdout.flush()
    time.sleep(sleeptime)

@flicklib.double_tap()
def doubletap(position):
    print("DOUBLE TAP")
    sys.stdout.flush()
    time.sleep(sleeptime)

@flicklib.tap()
def tap(position):
    print("TAP")
    sys.stdout.flush()
    time.sleep(sleeptime)

@flicklib.touch()
def touch(position):
    print("TOUCH")
    sys.stdout.flush()
    time.sleep(sleeptime)

signal.pause()
