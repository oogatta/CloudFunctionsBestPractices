
export class Firestore {
  collection(collectionpath: string): CollectionReference {
    return new CollectionReference();
  }
}

export class CollectionReference {
  doc(documentPath: string): DocumentReference {
    return new DocumentReference();
  }
}

export class DocumentReference {
  set(documentRef: DocumentReference, data: any, options?: any): any {
    return 1;
  }
  update(documentRef: DocumentReference, data: any, precondition?: any): any {
    return 1;
  }
}