import {AfterViewInit, ChangeDetectorRef, Component, DoCheck, ElementRef, Inject, InjectionToken, OnInit, Optional, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';

// function coursesServiceProvider(http:HttpClient): CoursesService {
//   return new CoursesService(http);
// }
// export const COURSES_SERVICE = new InjectionToken<CoursesService>('COURSES_SERVICE')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
     CoursesService,
  ]
})
export class AppComponent implements OnInit, DoCheck {

  courses$: Observable<Course[]>;
  // courses = COURSES;
  courses : Course[];
  loaded = false;

  category = 'BEGINNER'

  constructor(@Optional() private coursesService: CoursesService, private cd: ChangeDetectorRef) {
    console.log("root component ", this.coursesService.id);
  }

  ngOnInit() {
    // this.courses$ = this.coursesService.loadCourses();
    this.coursesService.loadCourses().subscribe(courses => {
      this.courses = courses
      this.loaded = true;
    });
  }

  changeCategory(){
    this.category = 'ADVANCED'
  }

  ngDoCheck(): void {
    // toda vez q tem mudança
    console.log("ngDoCheck")
    if(this.loaded){
     console.log("called for cd.markForCheck(")

      this.cd.markForCheck();
      this.loaded = undefined;

    }
  }

   save(course: Course)
   {
    this.coursesService.saveCourse(course).subscribe(val => {
      console.log("Course saved!")
    });
   }

   onEditCourse(){

   }


}
