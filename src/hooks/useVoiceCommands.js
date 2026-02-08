import { useState, useEffect, useCallback } from 'react'

const useVoiceCommands = () => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    const [recognition, setRecognition] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            const recognitionInstance = new SpeechRecognition()

            recognitionInstance.continuous = true // Changed to true for better flow
            recognitionInstance.interimResults = true
            recognitionInstance.lang = 'en-US'

            recognitionInstance.onstart = () => {
                setIsListening(true)
                setError(null)
            }

            recognitionInstance.onend = () => {
                setIsListening(false)
            }

            recognitionInstance.onresult = (event) => {
                let currentTranscript = ''
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript
                }
                setTranscript(currentTranscript)
            }

            recognitionInstance.onerror = (event) => {
                if (event.error === 'no-speech') {
                    // Ignore no-speech error as it just means silence
                    return
                }
                console.error("Speech recognition error", event.error)
                setError(event.error)
                setIsListening(false)
            }

            setRecognition(recognitionInstance)
        } else {
            setError('Browser not supported')
        }
    }, [])

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.start()
                setError(null)
            } catch (e) {
                console.error("Recognition start error", e)
            }
        }
    }, [recognition])

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop()
        }
    }, [recognition])

    const resetTranscript = useCallback(() => {
        setTranscript('')
    }, [])

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        error,
        isSupported: !!recognition
    }
}

export default useVoiceCommands
