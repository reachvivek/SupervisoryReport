import { Component } from '@angular/core';
import { RevRepoService, SupRepoService } from '../../../swagger';
import { firstValueFrom } from 'rxjs';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  showLoader: boolean = false;
  searchForm: {
    FromDate: string | undefined;
    ToDate: string | undefined;
    AtmId: string | undefined;
  } = {
    FromDate: undefined,
    ToDate: undefined,
    AtmId: undefined,
  };

  dateRanges: {
    FromDate: Date | undefined;
    ToDate: Date | undefined;
  } = {
    FromDate: undefined,
    ToDate: undefined,
  };

  dateFormat: string = 'dd/mm/yy';

  minDate: Date | undefined;
  maxDate: Date | undefined;

  supervisor_reports = [
    {
      AtmId: '0104BYA1',
      Date: '2024-04-25',
      Duration: '0:11:23',
      Supervisor_Entry_Exit_Count: 1,
      Supervisor_Activities: 2,
      Event:
        '[2024/04/25 12:09:35]ENTERED SUPERVISOR PROGRAM, [2024/04/25 12:20:58]EXITED SUPERVISOR',
      Safe_Door_Open_Close: 1,
      Safe_Door_Event:
        '[2024/04/25 12:10:15]SAFE DOOR OPENED, [2024/04/25 12:19:41]SAFE DOOR CLOSED',
      Safe_Door_Duration: '0:9:26',
      App_version: '03.01.00.09_CB_2.7.1S',
      Bank: 'CANARA',
    },
    {
      ATMID: '0104BYA1',
      Date: '2024-04-26',
      Duration: '0:22:57',
      Supervisor_Entry_Exit_Count: 3,
      Supervisor_Activities: 6,
      Event:
        '[2024/04/25 10:18:38]ENTERED SUPERVISOR PROGRAM, [2024/04/25 10:30:18]EXITED SUPERVISOR, [2024/04/25 10:30:23]ENTERED SUPERVISOR PROGRAM, [2024/04/25 10:31:48]EXITED SUPERVISOR, [2024/04/25 17:08:36]ENTERED SUPERVISOR PROGRAM, [2024/04/25 17:18:28]EXITED SUPERVISOR',
      Safe_Door_Open_Close: 3,
      Safe_Door_Event:
        '[2024/04/25 10:18:35]SAFE DOOR OPENED, [2024/04/25 10:28:47]SAFE DOOR CLOSED, [2024/04/25 10:30:21]SAFE DOOR OPENED, [2024/04/25 10:30:29]SAFE DOOR CLOSED, [2024/04/25 17:09:57]SAFE DOOR OPENED, [2024/04/25 17:17:05]SAFE DOOR CLOSED',
      Safe_Door_Duration: '0:17:28',
      App_version: '03.01.00.09_CB_2.7.1S',
      Bank: 'CANARA',
    },
  ];

  revision_reports = [
    {
      Date: '2024-04-26',
      Total_Cash_Jam: 0,
      Total_Error: 4,
      Deposit: 150,
      Withdrawal: 0,
      Error_Codes: ['5D0LA00', '5D7C800', '5D7C200'],
    },
    {
      Date: '2024-04-02',
      Total_Cash_Jam: 0,
      Total_Error: 61,
      Deposit: 56,
      Withdrawal: 0,
      Error_Codes: ['5D7C200'],
    },
    {
      Date: '2024-04-03',
      Total_Cash_Jam: 0,
      Total_Error: 56,
      Deposit: 46,
      Withdrawal: 0,
      Error_Codes: ['593G500'],
    },
  ];

  cols!: Column[];

  download_file_name: string = 'Supervisor Report';

  callRequired: boolean | undefined;

  cols1 = [
    { field: 'Date', header: 'Date' },
    { field: 'Duration', header: 'Duration' },
    {
      field: 'Supervisor_Entry_Exit_Count',
      header: 'Supervisor Entry / Exit Count',
    },
    { field: 'Supervisor_Activities', header: 'Supervisor Activities' },
    { field: 'Event', header: 'Event' },
    { field: 'Safe_Door_Open_Close', header: 'Safe Door Open Close' },
    { field: 'Safe_Door_Event', header: 'Safe Door Event' },
    { field: 'Safe_Door_Duration', header: 'Safe Door Duration' },
  ];

  cols2 = [
    { field: 'Atm_Date', header: 'Date' },
    { field: 'Total_Cash_Jam', header: 'Total Cash Jam' },
    {
      field: 'Total_Error',
      header: 'Total Error',
    },
    { field: 'Deposit', header: 'Deposit' },
    { field: 'Withdrawal', header: 'Withdrawal' },
    { field: 'Error_Codes', header: 'Error Codes' },
  ];

  exportHeader: string = 'customExportHeader';

  active_index: number = 1;

  constructor(
    private revRepoService: RevRepoService,
    private supRepoService: SupRepoService
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date();

    this.cols = this.cols1;

    this.supervisor_reports = [];
    this.revision_reports = [];
  }

  convertToString(ind: number) {
    const dateToUpdate =
      ind === 1 ? this.dateRanges.FromDate : this.dateRanges.ToDate;
    const offset = dateToUpdate!.getTimezoneOffset();
    const updatedDate = new Date(dateToUpdate!.getTime() - offset * 60 * 1000)
      .toISOString()
      .split('T')[0];

    if (ind === 1) {
      this.searchForm.FromDate = updatedDate;
    } else if (ind === 2) {
      this.searchForm.ToDate = updatedDate;
    }
  }

  async searchReports() {
    console.log(this.searchForm);
    this.showLoader = true;
    try {
      const res2 = await firstValueFrom(
        this.supRepoService.fetchSupervisorReports(this.searchForm)
      );
      if (res2.Data && res2.Data.length) {
        this.supervisor_reports = [...res2.Data];
        console.log(res2);
      }
    } catch (err: any) {
      console.log(err);
      this.showLoader = false;
    }
    this.showLoader = true;
    try {
      const res1 = await firstValueFrom(
        this.revRepoService.fetchRevisionReports(this.searchForm)
      );
      if (res1.Data && res1.Data.length) {
        this.revision_reports = [...res1.Data];
        this.callRequired = res1.CallReq;
        console.log(res1);
      }
      this.showLoader = false;
    } catch (err: any) {
      console.error(err);
      this.showLoader = false;
    }
  }

  switchTable(ind: number) {
    this.active_index = ind;
    if (ind == 1) {
      this.cols = this.cols1;
      this.download_file_name = 'Supervisor Report';
    }
    if (ind == 2) {
      this.cols = this.cols2;
      this.download_file_name = 'Revision Report';
    }
  }
  exportExcel() {}
}
