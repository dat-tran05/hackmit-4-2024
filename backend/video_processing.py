from FFEM.FFEM import MonitorEmotion_From_Video
from moviepy.editor import VideoFileClip
from tensorflow.keras.layers import LocallyConnected2D


def convert_avi_to_mp4(input_avi_path: str, output_mp4_path: str):
    """
    Convert an AVI video file to MP4 format.
    """
    try:
        video_clip = VideoFileClip(input_avi_path)
        video_clip.write_videofile(output_mp4_path, codec="libx264")
        print(f"Conversion complete: {output_mp4_path}")
    except Exception as e:
        print(f"An error occurred during conversion: {e}")

def enoughEmotion(filePath, processedFilePath):
    """
    Process the video for emotion monitoring and convert the output to MP4.
    """
    output = MonitorEmotion_From_Video(filePath, 'output.avi')
    convert_avi_to_mp4('output.avi', processedFilePath)
    return output
