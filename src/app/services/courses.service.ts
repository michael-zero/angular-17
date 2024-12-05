import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';

let counter = 0;
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  id;
  constructor(private http: HttpClient) {
    counter++;
    this.id = counter;

  }

  loadCourses(): Observable<Course[]>{
    const params = new HttpParams().set("page","1").set("pageSize","10");
    return this.http.get<Course[]>('http://localhost:9000/api/courses', {params})
  }

  saveCourse(course: Course){
    const headers = new HttpHeaders().set('X-Auth', 'userId');
    return this.http.put(`http://localhost:9000/api/courses/${course.id}`, course, {headers});
  }
}
