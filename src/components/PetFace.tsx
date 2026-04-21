import type { PetStats } from '../types'

type PetFaceProps = {
  petId: string
  stats: PetStats
}

type EyeState = 'happy' | 'sad' | 'sleepy' | 'sick'
type MouthState = 'smile' | 'hungry' | 'frown' | 'flat'

function getEyeState(stats: PetStats): EyeState {
  if (stats.health <= 25) {
    return 'sick'
  }

  if (stats.happiness <= 35) {
    return 'sad'
  }

  if (stats.energy <= 35) {
    return 'sleepy'
  }

  return 'happy'
}

function getMouthState(stats: PetStats): MouthState {
  if (stats.food <= 40) {
    return 'hungry'
  }

  if (stats.health <= 25) {
    return 'flat'
  }

  if (stats.happiness <= 35) {
    return 'frown'
  }

  return 'smile'
}

function renderEyes(eyeState: EyeState) {
  if (eyeState === 'sad') {
    return (
      <>
        <path
          d="M13 10C26 -1 41 3 45 22C47 39 38 50 22 51C7 51 0 39 2 23C4 15 8 11 13 10Z"
          fill="white"
          stroke="#111111"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M16 22C21 14 31 16 36 21C39 24 39 33 36 38C31 44 20 43 16 35C13 30 13 26 16 22Z"
          fill="#111111"
        />
        <path
          d="M75 12C88 2 103 5 108 22C110 39 102 50 86 51C71 51 64 40 65 24C67 16 70 12 75 12Z"
          fill="white"
          stroke="#111111"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M78 23C83 16 93 18 98 22C101 25 101 34 98 39C93 44 82 44 78 36C75 31 75 27 78 23Z"
          fill="#111111"
        />
      </>
    )
  }

  if (eyeState === 'sleepy') {
    return (
      <>
        <path
          d="M15 12C23 6 36 6 43 13C47 18 48 29 46 39C43 47 36 52 24 52C11 52 4 47 2 37C0 26 3 16 15 12Z"
          fill="white"
          stroke="#111111"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M13 30C20 24 31 24 38 29C35 37 29 41 23 41C17 41 14 37 13 30Z" fill="#111111" />
        <path
          d="M77 12C85 6 98 6 105 13C109 18 110 29 108 39C105 47 98 52 86 52C73 52 66 47 64 37C62 26 65 16 77 12Z"
          fill="white"
          stroke="#111111"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M75 30C82 24 93 24 100 29C97 37 91 41 85 41C79 41 76 37 75 30Z" fill="#111111" />
      </>
    )
  }

  if (eyeState === 'sick') {
    return (
      <>
        <path
          d="M15 13C25 5 37 7 43 14C47 20 48 29 46 39C43 48 35 53 24 53C12 53 4 47 3 36C2 25 4 18 15 13Z"
          fill="white"
          stroke="#111111"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M13 31C19 24 30 24 37 30C34 37 29 41 22 41C17 41 14 37 13 31Z" fill="#111111" />
        <path
          d="M73 17C84 8 100 10 107 20C110 25 111 34 107 45C101 51 93 54 82 53C73 51 67 46 65 37C64 29 66 22 73 17Z"
          fill="white"
          stroke="#111111"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M74 35C80 31 90 30 98 34C94 39 88 42 82 42C78 42 75 39 74 35Z" fill="#111111" />
      </>
    )
  }

  return (
    <>
      <path
        d="M15 12C23 6 36 6 43 13C47 18 48 29 46 39C43 48 35 53 24 53C12 53 4 47 2 37C0 26 3 17 15 12Z"
        fill="white"
        stroke="#111111"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M16 23C21 15 31 17 37 22C40 25 40 34 37 39C31 45 20 44 16 35C14 31 14 27 16 23Z" fill="#111111" />
      <path
        d="M77 12C85 6 98 6 105 13C109 18 110 29 108 39C105 48 97 53 86 53C74 53 66 47 64 37C62 26 65 17 77 12Z"
        fill="white"
        stroke="#111111"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M78 23C83 15 93 17 99 22C102 25 102 34 99 39C93 45 82 44 78 35C76 31 76 27 78 23Z" fill="#111111" />
    </>
  )
}

function renderMouth(mouthState: MouthState) {
  if (mouthState === 'hungry') {
    return (
      <g className="pet-face__mouth pet-face__mouth--hungry">
        <path
          d="M40 63C50 76 71 77 82 63"
          fill="none"
          stroke="#111111"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M44 68C54 62 70 62 84 66C80 80 70 87 58 87C49 87 40 80 44 68Z"
          fill="#9F0000"
          stroke="#111111"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <rect x="63" y="66" width="8" height="12" rx="2" fill="white" />
      </g>
    )
  }

  if (mouthState === 'frown') {
    return (
      <path
        d="M46 74C56 65 67 64 80 71"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
      />
    )
  }

  if (mouthState === 'flat') {
    return (
      <path
        d="M49 74C58 72 68 72 77 73"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
      />
    )
  }

  return (
    <>
      <path
        d="M44 66C54 61 69 61 83 65C80 78 70 85 58 85C49 85 41 78 44 66Z"
        fill="#9F0000"
        stroke="#111111"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect x="63" y="65" width="8" height="12" rx="2" fill="white" />
      <path
        d="M18 60C15 69 15 76 23 84"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M23 84C24 81 26 79 30 79"
        fill="none"
        stroke="#111111"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  )
}

function PetFace({ petId, stats }: PetFaceProps) {
  const eyeState = getEyeState(stats)
  const mouthState = getMouthState(stats)

  return (
    <span className={`pet-face pet-face--${petId}`} aria-hidden="true">
      <svg viewBox="0 0 120 92" className="pet-face__svg">
        {renderEyes(eyeState)}
        {renderMouth(mouthState)}
      </svg>
    </span>
  )
}

export default PetFace
