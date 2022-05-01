import { getFirestore, doc, setDoc, getDoc, getDocs, addDoc, where, collection, serverTimestamp, updateDoc, deleteDoc } from "firebase/firestore"


export default class Firestore {

    constructor() {
        this.userCollection = "user"
        this.db = getFirestore();
        this.actCollection = "activity_rec"
        this.farmCollection = "farm_info"
        this.AreaCollection = "farm_coordinate"
    }

    // getActRef = (id) => doc(this.db, this.actCollection, id)
    getActRef = () => collection(this.db, this.actCollection)
    getUserRef = (id) => doc(this.db, this.userCollection, id)
    getFarmIdRef = (id) => doc(this.db, this.farmCollection, id)
    getFarmRef = () => collection(this.db, this.farmCollection)
    getFarmcoordRef = () => collection(this.db, this.AreaCollection)
    

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

            return user.data();

        } catch (error) {
            throw error;
        }
    }

    async isUserExist(id) {
        try {
            const userRef = this.getUserRef(id)
            const user = await getDoc(userRef)

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

    async getActivity() {
        try {
            const actRef = this.getActRef()
            const act = await getDocs(actRef)
            return act.docs.map(doc => doc.data())

        } catch (error) {
            throw error;
        }
    }

    async addFarmarea(data) {
        try {
            const farmRef = this.getFarmcoordRef()
            await addDoc(farmRef, data)

            
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

    async getFarm() {
        try {
            const farmRef = this.getFarmRef()
            const farm = await getDocs(farmRef)
            return farm.docs.map((doc) => ({...doc.data(), id: doc.id}));

        } catch (error) {
            throw error;
        }
    }

    async editFarm(id, data) {
        try {
            const farmRef = this.getFarmIdRef(id)
            await updateDoc(farmRef, data)


        } catch (error) {
            throw error;
        }
    }

    async deleteFarm(id) {
        try {
            const farmRef = this.getFarmIdRef(id)
            await deleteDoc(farmRef)


        } catch (error) {
            throw error;
        }
    }

}