# SigDish
A React-Native Application with images and ratings of the dishes you ordered.

CURRENT STATE OF THE PROJECT:
Project is actually in alpha version, basically functional for testing purposes but non styled.

**FRONTEND:**
Project is written in ReactNative, using Expo XDE.

**BACKEND:**
SigDish is using Google Firebase for User authentication, database management and storage.
***DUE TO A KNOW BUG PREVENTING REACTNATIVE APPLICATION ON EXPO FROM UPLOADING BLOB FILES ON FIREBASE STORAGE,
THE IMAGE FILE IS CURRENTLY SAVED IN THE DATABASE AS A BASE64 JPEG STRING.***
Registration of new users is non-verified and unrestricted.
Entries are merged in a single bucket at present stage, meaning every user will be seeing every other users' entries.
