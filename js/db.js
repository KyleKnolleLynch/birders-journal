//  real-time listener
db.collection('entries').onSnapshot(snapshot => {
  console.log(snapshot.docChanges());
  snapshot.docChanges().forEach(change => {
    // console.log(change, change.doc.data(), change.doc.id);
    if(change.type === 'added') {
      renderEntry(change.doc.data(), change.doc.id);
    }
     if(change.type === 'removed') {

    }
  });
});
