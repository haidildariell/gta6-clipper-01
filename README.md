# Your Next Customer Is a Gator — GTA VI clip for gta6-clipper-01

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/haidildariell/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/haidildariell/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

Entry for the make.fun bounty **[gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01)**
("Clip GTA 6 for the most YouTube views", $500, top 20 paid, scored on
YouTube views at the 2026-11-23T01:00:00Z deadline).

## The clip

A 31-second vertical Short (1080×1920, H.264 + AAC) built around **one
specific moment**: the alligator that strolls through the automatic doors
into a Leonida convenience store, caught on the store's own "FRONT DOOR"
CCTV camera in Rockstar's GTA VI Trailer 1. It is the most memed animal
shot in the trailers — pure "Florida Man" energy that reads in under a
second with zero context.

Structure (one moment, replayed — not a montage):

1. **Hook (0–2 s):** the gator mid-entrance in slow motion under the big
   text "YOUR NEXT CUSTOMER / IS A GATOR".
2. **Context:** the same gator being hauled out of a backyard pool
   ("FIRST, HE CRASHED THE POOL") — the trailer's other gator shot.
3. **Payoff:** a zoomed punch-in replay of the store entrance with the
   punchline "bro just wanted snacks", a CCTV-style "REPLAY", and the
   closer "ONLY IN LEONIDA".
4. **Pitch card (last 6 s, on screen):** "Make clips like this with AI
   and earn money on make.fun" + `make.fun/bounty/gta6-clipper-01`.

Suggested YouTube title: **The Gator Walked In Like He Pays Rent 🐊 #GTA6 #Shorts**

The rendered file is `clip.mp4` (kept out of git — see `.gitignore`).
Once it is uploaded to YouTube, its URL goes into `VIDEO.json`.

## How the clip was built

Footage: GTA VI Trailer 1 (Rockstar Games, YouTube) downloaded at 720p
with `yt-dlp`. The store shot lives at ~47.9–48.5 s and the pool shot at
~42.6–43.6 s of the trailer; both were cut frame-tight (the store shot is
under a second long, so the edit leans on slow motion, freeze frames and
replays). Everything was rendered with `ffmpeg`:

- landscape → vertical via blur-fill (full-frame blurred background,
  sharp foreground centred), 1080×1920, 30 fps;
- slow-motion segments via `setpts`, freeze frames via `tpad`;
- all on-screen text burned in with `drawtext` (DejaVu Sans Bold);
- segments concatenated, trailer audio re-attached as AAC.

## Running the entrypoint

`main.ts` (Node 22, standard library only) validates `VIDEO.json` and
copies it from the repo root into the make.fun output directory:

```sh
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
# -> out/VIDEO.json
```

`MAKEFUN_OUTPUT_DIR` defaults to `/output` when unset.
