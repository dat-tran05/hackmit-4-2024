import requests

MODEL_ID = "8w6yyp2q"
BASETEN_API_KEY = "YMKFudUr.FcjOTi13DlaR3ZtCbBIumoXeqFJy25yx"

def get_improved_transcript_from_llama(transcript: str) -> str:
    print("Transcript:", transcript)
    
    messages = [
        {"role": "system", "content": "You are an expert in the field of topic this transcript is."},
        {"role": "user", "content": f"What would you improve to make this speech/presentation sound better and more concise? Write the improved transcription. Transcription: {transcript}"}
    ]
    
    payload = {
        "messages": messages,
        "stream": False,
        "max_tokens": 2048,
        "temperature": 0.9
    }

    try:
        res = requests.post(
            f"https://model-{MODEL_ID}.api.baseten.co/production/predict",
            headers={"Authorization": f"Api-Key {BASETEN_API_KEY}"},
            json=payload
        )
        res.raise_for_status()
        return res.text  # Get the raw text response directly
    except requests.RequestException as e:
        print(f"Error during Llama model request: {e}")
        return "Error during response"

def get_questions_from_llama(transcript: str) -> list:
    print("Transcript:", transcript)
    
    messages = [
        {"role": "system", "content": "You are an expert in the field of topic this transcript is."},
        {"role": "user", "content": f"Based on the transcript, generate 2-3 questions that could be asked to further explore or understand the content. Only display the questions and no commentary. Split each question with a new line. Transcription: {transcript}"}
    ]
    
    payload = {
        "messages": messages,
        "stream": False,
        "max_tokens": 2048,
        "temperature": 0.9
    }
    
    try:
        res = requests.post(
            f"https://model-{MODEL_ID}.api.baseten.co/production/predict",
            headers={"Authorization": f"Api-Key {BASETEN_API_KEY}"},
            json=payload
        )
        res.raise_for_status()
        return res.text
    except requests.RequestException as e:
        print(f"Error during Llama model request: {e}")
        return ["Error during response"]