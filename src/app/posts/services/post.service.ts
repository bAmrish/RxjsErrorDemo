import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { Post } from "../models/post.model";

@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>("https://jsonplaceholder.typicode.com/todoss")
      .pipe(
        //Order is important
        // if I swap the first catch error fucntion with the second one
        // the second in the list will never be called because in that case
        // the first one is not thrwoing error but returing just an empty observable.
        catchError(error => {
          console.log("Error caught in catchError");
          return throwError(error);
        }),
        catchError(error => {
          console.log("Error caught in catchError2", error);
          return of([]);
        })
      );
  }
}
