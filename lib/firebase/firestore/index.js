import { getFirestore, doc, setDoc, getDoc, getDocs, addDoc, collection, serverTimestamp } from "firebase/firestore"


export default class Firestore {

    constructor() {
        this.userCollection = "user"
        this.db = getFirestore();
        this.actCollection = "activity_rec"
        this.farmCollection = "farm_info"
    }

    getActRef = (id) => doc(this.db, this.actCollection, id)
    getUserRef = (id) => doc(this.db, this.userCollection, id)
    getFarmRef = (id) => doc(this.db, this.farmCollection, id)
    getaddFarmRef = () => collection(this.db, this.farmCollection)
    

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

    async addActivity(id, data) {
        try {
            const actRef = this.getActRef(id)
            await setDoc(actRef, data)

            
        } catch (error) {
            throw error;
        }
    }

    async getActivity(id) {
        try {
            const actRef = this.getActRef(id)
            const act = await getDoc(actRef)
            console.log(act.data());
            return act.data();

        } catch (error) {
            throw error;
        }
    }

    async addFarmInfo(id, data) {
        try {
            const farmRef = this.getFarmRef(id)
            await setDoc(farmRef, data)

            
        } catch (error) {
            throw error;
        }
    }

    async getFarm(id) {
        try {
            const farmRef = this.getFarmRef(id)
            const farm = await getDoc(farmRef)
            console.log(farm.data());

            return farm.data();

        } catch (error) {
            throw error;
        }
    }

}