import os
from google.cloud import speech
from pydub import AudioSegment

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./google-service-account.json"

def convert_audio(input_file, output_file, target_sample_rate):
    audio = AudioSegment.from_wav(input_file)
    audio = audio.set_frame_rate(target_sample_rate)
    audio = audio.set_channels(1)
    audio.export(output_file, format="wav")

def transcribe_file(audio_file: str) -> speech.RecognizeResponse:
    """Transcribe the given audio file.
    Args:
        audio_file (str): Path to the local audio file to be transcribed.
            Example: "resources/audio.wav"
    Returns:
        cloud_speech.RecognizeResponse: The response containing the transcription results
    """
    new_audio_file = "converted_audio.wav"
    convert_audio(audio_file, new_audio_file, 16000)
    
    client = speech.SpeechClient()

    with open(new_audio_file, "rb") as f:
        audio_content = f.read()

    audio = speech.RecognitionAudio(content=audio_content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
    )

    response = client.recognize(config=config, audio=audio)

    # Collect all transcripts into a single string
    transcript = ' '.join(result.alternatives[0].transcript for result in response.results)
    print(transcript)
    return transcript
