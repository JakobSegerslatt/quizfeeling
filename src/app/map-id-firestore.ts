import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { OperatorFunction } from 'rxjs';

// Operator
export function addDocumentIds<T = any>(): OperatorFunction<DocumentChangeAction<T>, T> {
    return map((x: DocumentChangeAction<T>) => {
        const data = x.payload.doc.data();
        const id = x.payload.doc.id;
        return {
            id,
            ...data,
        };
    });
}

// pipe<A>(op1: OperatorFunction<T, A>): Observable<A>
export const addDocumentIds2 = <T = any>() => {
    const obs = map((x: DocumentChangeAction<T>) => {
        const data = x.payload.doc.data();
        const id = x.payload.doc.id;
        return {
            id,
            ...data,
        } as T;
    });
    return obs;
};

