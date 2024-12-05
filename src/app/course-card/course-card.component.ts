import {
    AfterContentInit,
    AfterViewInit,
    Attribute,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    QueryList,
    SkipSelf,
    ViewEncapsulation
} from '@angular/core';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';
// import { COURSES_SERVICE } from '../app.component';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    // providers: [
    //   CoursesService
    // ]
})
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();


    constructor(@SkipSelf() private coursesService: CoursesService, @Attribute("type") private type: string) {

    }

    ngOnInit() {
      console.log("courseService course card", this.coursesService.id)
    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }

    onTitleChanged(newTitle: string){
      this.course.description = newTitle
    }


}
