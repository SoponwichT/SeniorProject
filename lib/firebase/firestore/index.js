import { getFirestore, doc, setDoc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"


export default class Firestore {

    constructor() {
        this.userCollection = "user"
        this.db = getFirestore();
        this.actCollection = "activity_rec"
        this.farmCollection = "farm_info"
    }

    getActRef = () => collection(this.db, this.actCollection)
    getUserRef = (id) => doc(this.db, this.userCollection, id)
    getFarmRef = () => collection(this.db, this.farmCollection)

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

    async addActivity(data) {
        try {
            const actRef = this.getActRef()
            await addDoc(actRef, data)

            
        } catch (error) {
            throw error;
        }
    }

    async addFarmInfo(data) {
        try {
            const farmRef = this.getFarmRef()
            await addDoc(farmRef, data)

            
        } catch (error) {
            throw error;
        }
    }

}