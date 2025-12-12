import streamlit as st
from PIL import Image
import torch

st.title("Anomaly Detector")

uploaded = st.file_uploader("Upload Image", type=["jpg","png","jpeg"])

if uploaded:
    img = Image.open(uploaded)
    st.image(img, caption="Uploaded Image")

    # run your ML model here
    # result = model.predict(img)

    st.success("Anomaly Result: Normal / Defected")
