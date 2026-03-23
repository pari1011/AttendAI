from flask import Flask, request, jsonify
import face_recognition

app = Flask(__name__)

@app.route("/encode", methods=["POST"])
def encode():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]
    
    image = face_recognition.load_image_file(file)
    
    encodings = face_recognition.face_encodings(image)

    if len(encodings) == 0:
        return jsonify({"error": "No face found"}), 400

    encoding = encodings[0]

    return jsonify({
        "encoding": encoding.tolist()
    })

if __name__ == "__main__":
    app.run(port=8000)