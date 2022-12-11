import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from './firebase-config';

export const AddSubData = async (inputs, images) => {
  if (images.length !== 0) {
    await addDoc(collection(db, `juice`), {
      ...inputs,
      timestamp: serverTimestamp(),
    }).then((docRef) => {
      return uploadMultipleImage(images, docRef.id).then((r) => {
        return r;
      });
    });
  }
};

export const uploadMultipleImage = async (images, id) => {
  const promises = [];
  const imageURL = [];
  images.map((file) => {
    console.log('loop');
    const sotrageRef = ref(storage, `juiceimg/${id}.jpg`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    promises.push(uploadTask);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => console.log(error),
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
          imageURL.push();
          console.log('File available at', downloadURLs);
          async function updateDocs() {
            await updateDoc(
              doc(db, `juice`, id),
              {
                id: id,
                image: arrayUnion(downloadURLs),
              },
              { merge: true }
            );
          }
          updateDocs();
        });
      }
    );
  });
  return Promise.all(promises)
    .then(() => {
      // toast.success('Successfully Created');
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
