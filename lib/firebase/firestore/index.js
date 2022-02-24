import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"


export default class Firestore {

    constructor() {
        this.userCollection = "user"
        this.db = getFirestore();
    }


    getUserRef = (id) => doc(this.db, this.userCollection, id)

    async addUser(id, user) {
        try {
            const userRef = this.getUserRef(id)
            await setDoc(userRef, user);

            return await this.getUser(id)

        } catch (error) {
            throw error
        }
    }

    async getUser(id) {
        try {
            const userRef = this.getUserRef(id)
            const user = await getDoc(userRef)
            console.log(user.data());

            return user.data();

        } catch (error) {
            throw error;
        }
    }

    async isUserExist(id) {
        try {
            const userRef = this.getUserRef(id)
            const user = await getDoc(userRef)
            console.log(user.exists());

            return user.exists();

        } catch (error) {
            throw error;
        }
    }

}