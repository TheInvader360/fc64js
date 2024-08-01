# Audio Manager (fc64js demo rom)

[<img src="https://raw.githubusercontent.com/TheInvader360/fc64js/main/rom/demo/audio-manager/docs/demo.png" width="256"/>](https://theinvader360.github.io/fc64js/rom/demo/audio-manager/)

[Play in browser](https://theinvader360.github.io/fc64js/rom/demo/audio-manager/)

## Overview

The [fc64js](https://github.com/TheInvader360/fc64js) audio system has been kept intentionally simple - a single oscillator that plays a maximum of one square sound wave at a time, all at constant volume, with beep durations measured in system ticks (1/60th of a second each)

The example audio manager in this demo offers a means of triggering *slightly* more complex sound effects than a single beep in a "fire and forget" manner - initialise with a ```ticksPerEntry``` value, ```update()``` on each ```romLoop()``` tick, and call ```tryPlay()``` with appropriate audio clip ```data``` and ```priority``` values during in game events

Each audio clip's ```data``` is simply an array of frequencies (measured in hertz) to be played in sequence, and each entry is to be played for the number of ticks specified during initialisation (i.e. ```ticksPerEntry```)

### Prioritisation rules

* If no audio clip is currently playing when a ```tryPlay()``` call is made: trigger succeeds (requested clip is played)
* If an audio clip is currently playing with a lower or equal priority than that specified in the subsequent ```tryPlay()``` call: trigger succeeds (requested clip is played)
* If an audio clip is currently playing with a higher priority than that specified in the subsequent ```tryPlay()``` call: trigger fails (requested clip is not played)

(Note that higher priorities have lower numerical values e.g. a priority 1 call is a higher priority than a priority 2 call)

### Example scenario

Consider a platform game where the player character collects coins that are plentiful, and is occasionally rewarded with an extra life. In this game you might want each new coin collision to trigger a sound effect, and the gaining of an extra life to trigger a different sound effect. In some areas the coins could be so tightly spaced that subsequent coin collisions could occur before the current coin audio clip has finished playing - in this situation the new ```tryPlay()``` call should override the current clip. Since the extra life event is a rare achievement it's ```tryPlay()``` call should override any lesser currently playing audio clip (e.g. if a coin had been collected immediately prior to the extra life being awarded), but it should not itself be overridden by calls originating from lesser events (e.g. picking up a coin immediately after gaining an extra life). To achieve something along these lines simply call e.g. ```tryPlay(sfxCoin, 2)``` whenever a coin is collected, and e.g. ```tryPlay(sfxOneUp, 1)``` whenever an extra life is awarded. To simulate this scenario using the demo: continuously tap the L button in quick succession, and occasionally tap the U button

### Demo controls

* Press U/D to try playing equally high priority (i.e. priority 1) sound clips
* Press L/R to try playing equally middling priority (i.e. priority 2) sound clips
* Press A/B to try playing equally low priority (i.e. priority 3) sound clips

## Credits

* Code by TheInvader360
* Example sound effects from [themushroomkingdom.net (Super Mario Bros NES)](https://themushroomkingdom.net/media/smb/wav)
