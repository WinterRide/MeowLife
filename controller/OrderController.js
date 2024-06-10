import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getUserDocIdByEmail } from "./DistinctController";
import { firestore } from "../firebase";

const updateUserOrder = async (buyerEmail, orderId) => {
    const userId = await getUserDocIdByEmail(buyerEmail);
    const userDocRef = doc(firestore, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);
    await updateDoc(userDocRef, {
        orders: [...(userDocSnapshot.data().orders || []), orderId]
    });
}

const updateUserStatus = async (email, status) => {
    const userId = await getUserDocIdByEmail(email);
    const userDocRef = doc(firestore, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);
    await updateDoc(userDocRef, {
        onOrder: status
    });
}

export const handleRequestOrder = async (buyerEmail, sellerEmail, itemId) => {
    try {
        const orderDocRef = await addDoc(collection(firestore, 'orders'), {
            buyer: buyerEmail,
            seller: sellerEmail,
            itemId: itemId,
            status: "Pending",
            buyerAccept: false,
            sellerAccept: false
        });

        await updateDoc(doc(firestore, 'orders', orderDocRef.id), {
            id: orderDocRef.id
        });

        await updateUserOrder(buyerEmail, orderDocRef.id)
        
        alert('Order has been requested successfully');
    } catch (error) {
        console.error('Error creating order: ', error);
    }
};

export const getOrderDocIdsByBuyerAndItem = async (buyerEmail, itemId) => {
    try {
        const q = query(
            collection(firestore, "orders"),
            where("buyer", "==", buyerEmail),
            where("itemId", "==", itemId)
        );
        
        const querySnapshot = await getDocs(q);
        const orderDocIds = querySnapshot.docs.map(doc => doc.id);

        return orderDocIds;
    } catch (error) {
        console.error('Error getting order document IDs: ', error);
        throw error;
    }
};

export const getNicknameByEmail = async (email) => {
    try {
        const q = query(
            collection(firestore, "users"),
            where("email", "==", email)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return userDoc.data().nickname;
        } else {
            throw new Error('No matching document found');
        }
    } catch (error) {
        console.error('Error getting nickname: ', error);
        throw error;
    }
};

export const getOrderByEmail = async (email) => {
    try {
        const sellerQuery = query(
            collection(firestore, "orders"),
            where("status", "==", "On Going"),
            where("seller", "==", email)
        );

        const buyerQuery = query(
            collection(firestore, "orders"),
            where("status", "==", "On Going"),
            where("buyer", "==", email)
        );

        const [sellerSnapshot, buyerSnapshot] = await Promise.all([
            getDocs(sellerQuery),
            getDocs(buyerQuery)
        ]);

        const orders = [
            ...sellerSnapshot.docs.map(doc => doc.data()),
            ...buyerSnapshot.docs.map(doc => doc.data())
        ];

        // Remove duplicates if necessary
        const uniqueOrders = Array.from(new Set(orders.map(order => order.id)))
                                  .map(id => orders.find(order => order.id === id));

        return uniqueOrders;
    } catch (error) {
        console.error('Error getting orders: ', error);
        throw error;
    }
};

export const getOrderHistoryByEmail = async (email) => {
    try {
        // Query for orders where the user is the buyer
        const buyerQuery = query(
            collection(firestore, "orders"),
            where("buyer", "==", email)
        );

        // Query for orders where the user is the seller
        const sellerQuery = query(
            collection(firestore, "orders"),
            where("seller", "==", email)
        );

        // Execute both queries in parallel
        const [buyerSnapshot, sellerSnapshot] = await Promise.all([
            getDocs(buyerQuery),
            getDocs(sellerQuery)
        ]);

        // Merge results from both queries
        const orders = [
            ...buyerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            ...sellerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        ];

        // Optionally, remove duplicates if necessary
        const uniqueOrders = Array.from(new Set(orders.map(order => order.id)))
                                  .map(id => orders.find(order => order.id === id));

        return uniqueOrders;
    } catch (error) {
        console.error('Error getting orders: ', error);
        throw error;
    }
};


export const handleAcceptOrderBySeller = async (orderId, buyerEmail, sellerEmail) => {
    try {
        const orderDocRef = doc(firestore, 'orders', orderId);
        const orderDocSnapshot = await getDoc(orderDocRef);

        if (orderDocSnapshot.exists()) {
            const orderData = orderDocSnapshot.data();
            console.log('Order data:', orderData);
            await updateDoc(orderDocRef, {
                status: 'On Going'
            });

            await updateUserStatus(buyerEmail, true)
            await updateUserStatus(sellerEmail, true)
            await updateUserOrder(sellerEmail, orderId)
            alert(`Order has been accepted successfully.`);
        } else {
            console.log('No such document in the orders collection!');
        }
    } catch (error) {
        console.error('Error accepting order: ', error);
    }
};

export const handleCancelOrder = async (orderId, buyerEmail, sellerEmail) => {
    try {
        const orderDocRef = doc(firestore, 'orders', orderId);
        const orderDocSnapshot = await getDoc(orderDocRef);

        if (orderDocSnapshot.exists()) {
            const orderData = orderDocSnapshot.data();
            console.log('Order data:', orderData);
            await updateDoc(orderDocRef, {
                status: 'Canceled'
            });

            await updateUserStatus(buyerEmail, false)
            await updateUserStatus(sellerEmail, false)
            alert(`Order has been canceled successfully.`);
        } else {
            console.log('No such document in the orders collection!');
        }
    } catch (error) {
        console.error('Error accepting order: ', error);
    }
};