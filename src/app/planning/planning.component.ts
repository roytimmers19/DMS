import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CalendarEvent, CalendarView} from "angular-calendar";
import {colors} from "@app/planning-utils/colors";
import {RitService} from "@app/_services/rit.service";
import {Rit} from "@app/_models/rit";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AdminRitComponent} from '@app/admin-rit/admin-rit.component';
import {AuthenticationService} from "@app/_services/authentication.service";
import {User} from "@app/_models/user";
import {Role} from "@app/_models/role";
import {UserRitComponent} from "@app/user-rit/user-rit.component";


@Component({
  selector: 'app-planning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  user: User;
  events: CalendarEvent[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  refresh: Subject<any> = new Subject();

  constructor(private ritService: RitService, private modalService: NgbModal,
              private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit() {
    this.setEvents()
  }

  setEvents() {
    this.events.pop();
    this.ritService.getAll().pipe(takeUntil(this.destroy$)).subscribe((data: Rit[]) => {
      data.forEach(rit => {
        this.events.push({
          id: rit.id,
          title: rit.title,
          end: new Date(rit.end),
          start: new Date(rit.start),
        })
      })
    })
    this.refresh.next();
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  eventClicked({event}: { event: CalendarEvent }): void {
    let ref;
    if (this.user.role == Role.Admin) {
      ref = this.modalService.open(AdminRitComponent, {centered: true});
    } else {
      ref = this.modalService.open(UserRitComponent, {centered: true});
    }
    let selectedRit = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end
    }
    ref.componentInstance.selectedRit = selectedRit;

    ref.result.then((yes) => {
      selectedRit = ref.componentInstance.selectedRit;
        console.log('Yes Click');
       // this.events[this.events.indexOf(selectedRit)] = selectedRit;
        // this.refresh.next();
      },
      (cancel) => {
        console.log("Cancel Click");

      })
  }

  clickedDate(date: Date) {
    let ref;
    if (this.user.role == Role.Admin) {
      ref = this.modalService.open(AdminRitComponent, {centered: true});
      console.log(date);
    }
    var startDate = date;
    var endDate = date;
    endDate.setHours(date.getHours()+1);

    let selectedRit = {
      title: 'Titel',
      start: startDate,
      end: endDate
    }
    ref.componentInstance.selectedRit = selectedRit;

    ref.result.then((yes) => {
        selectedRit = ref.componentInstance.selectedRit;
        console.log('Yes Click');
        this.events[this.events.indexOf(selectedRit)] = selectedRit;
        this.refresh.next();
      },
      (cancel) => {
        console.log("Cancel Click");

      })
  }
}
