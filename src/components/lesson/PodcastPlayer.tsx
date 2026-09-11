import { useState } from 'react'
import { Volume2, Pause, Play, SkipBack, SkipForward } from 'lucide-react'

interface PodcastPlayerProps {
  title: string
  audioUrl: string
  duration?: number
}

export default function PodcastPlayer({
  title,
  audioUrl,
  duration,
}: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  const handlePlayPause = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSkip = (seconds: number) => {
    if (audioElement) {
      audioElement.currentTime = Math.max(
        0,
        Math.min(audioElement.duration, audioElement.currentTime + seconds)
      )
    }
  }

  const handlePlaybackRate = (rate: number) => {
    if (audioElement) {
      audioElement.playbackRate = rate
      setPlaybackRate(rate)
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-4 mb-6">
        <Volume2 className="text-sky-500" size={24} />
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Educational Podcast</p>
        </div>
      </div>

      <audio
        ref={setAudioElement}
        src={audioUrl}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={audioElement?.duration || 0}
          value={currentTime}
          onChange={(e) => {
            if (audioElement) {
              audioElement.currentTime = parseFloat(e.target.value)
              setCurrentTime(parseFloat(e.target.value))
            }
          }}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(audioElement?.duration || 0)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => handleSkip(-15)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <SkipBack size={20} />
        </button>

        <button
          onClick={handlePlayPause}
          className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={() => handleSkip(15)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Playback Speed */}
      <div className="flex gap-2 justify-center">
        {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
          <button
            key={rate}
            onClick={() => handlePlaybackRate(rate)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              playbackRate === rate
                ? 'bg-sky-500 text-white'
                : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {rate}x
          </button>
        ))}
      </div>
    </div>
  )
}
