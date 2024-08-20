function addData(db: any, data: any) {
  const transaction = db.transaction(["messages"], "readwrite");
  const objectStore = transaction.objectStore("messages");

  const request = objectStore.add(data);

  request.onsuccess = () => {
    console.log("Data added successfully!");
  };

  request.onerror = (event: any) => {
    console.error("Add request error: ", event.target.error);
  };
}

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("chats", 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("messages")) {
        db.createObjectStore("messages", { keyPath: "_id" });
      }
    };

    request.onsuccess = (event: any) => {
      resolve(event.target.result);
    };

    request.onerror = (event: any) => {
      reject(event.target.errorCode);
    };
  });
};

// get all data from indexedb
const getAllDataFromDB = async () => {
  // Function to retrieve all messages from the object store
  const getAllMessages = (db: IDBDatabase) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["messages"], "readwrite");
      const objectStore = transaction.objectStore("messages");

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = (event: any) => {
        resolve({ messages: event.target.result, objectStore });
      };

      getAllRequest.onerror = (event: any) => {
        reject(event.target.errorCode);
      };
    });
  };

  try {
    // Open the database
    const database: any = await openDatabase();

    // Get all messages
    const { messages }: any = await getAllMessages(database);

    return messages;
  } catch (err) {
    console.log("err", err);
  }
};

const updateMultipleRecords = async (records: any) => {
  return async () => {
    // Open the database
    const db: any = await openDatabase();

    const transaction = db.transaction(["messages"], "readwrite");
    const store = transaction.objectStore("messages");

    records.forEach((record: any) => {
      const request = store.put(record);
      request.onerror = (event: any) => {
        console.error(
          `Failed to update record with key ${record.id}`,
          event.target.error
        );
      };
    });

    transaction.oncomplete = () => {
      console.log("All records updated successfully.");
      return "updated";
    };

    transaction.onerror = (event: any) => {
      console.error("Transaction failed", event.target.error);
      return event.target.error;
    };
  };
};

export { getAllDataFromDB, addData, updateMultipleRecords };
