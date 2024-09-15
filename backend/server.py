from flask import Flask, request, jsonify
from mic import transcribe_file
from whisper import get_improved_transcript_from_llama, get_questions_from_llama
from flask_cors import CORS
from video_processor import enoughEmotion  # Import the video processing functions

app = Flask(__name__)
CORS(app)

# API Endpoints
@app.route('/api/upload', methods=['POST'])
def upload_file():
    print("UPLOADED")
    if 'file' not in request.files:
        print("No file part in the request")
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        print("No selected file")
        return jsonify({'error': 'No selected file'}), 400
    file_path = 'uploaded_audio.wav'
    file.save(file_path)
    transcript = transcribe_file(file_path)
    return jsonify({'transcript': transcript})

@app.route('/api/improved-transcript', methods=['POST'])
def get_improved_transcript():
    transcript = request.json.get('transcript')
    improved_transcript = get_improved_transcript_from_llama(transcript)
    return jsonify({'improvedTranscript': improved_transcript})

@app.route('/api/questions', methods=['POST'])
def get_questions():
    transcript = request.json.get('transcript')
    questions = get_questions_from_llama(transcript)
    return jsonify({'questions': questions})

@app.route('/api/emotion-monitor', methods=['POST'])
def emotion_monitor():
    if 'file' not in request.files:
        print("No file part in the request")
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        print("No selected file")
        return jsonify({'error': 'No selected file'}), 400
    file_path = 'uploaded_video.mp4'
    processed_file_path = 'processed_video.mp4'
    file.save(file_path)
    
    # Call the video processing function from the imported file
    emotion_result = enoughEmotion(file_path, processed_file_path)
    
    return jsonify({'emotion_result': emotion_result, 'processed_file': processed_file_path})

if __name__ == '__main__':
    app.run(port=5000)
