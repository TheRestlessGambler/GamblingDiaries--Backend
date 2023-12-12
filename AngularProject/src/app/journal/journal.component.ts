import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface JournalEntry {
  date: string;
  time: string;
  symbol: string;
  pnl: string;
  observation: string;
}

interface UserIdResponse {
  userId: string;
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css'],
})
export class JournalComponent implements OnInit {
  popupVisible = false;
  entries: JournalEntry[] = [];

  formData = {
    date: '',
    time: '',
    symbol: '',
    pnl: '',
    observation: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Do nothing here, initialization will happen after obtaining the user ID
  }

  togglePopup() {
    this.popupVisible = !this.popupVisible;
  }

  onSubmit() {
    const username = localStorage.getItem('username') as string;

    this.http.get<UserIdResponse>(`http://localhost:3000/findUser/${username}`).subscribe(
      (response) => {
        const userId = response.userId;

        const entryData = {
          date: this.formData.date,
          time: this.formData.time,
          symbol: this.formData.symbol,
          pnl: this.formData.pnl,
          observation: this.formData.observation,
        };

        // Proceed with the POST request
        this.http.post(`http://localhost:3000/journal/${userId}`, entryData).subscribe(
          (addedEntry: any) => {
            console.log('Entry added successfully:', addedEntry);

            const newEntry: JournalEntry = {
              date: addedEntry.date,
              time: addedEntry.time,
              symbol: addedEntry.symbol,
              pnl: addedEntry.pnl.toString(),
              observation: addedEntry.observation,
            };

            this.entries.push(newEntry);
            console.log(this.entries);

            this.resetFormData();
            this.popupVisible = false;

            // Fetch entries and initialize component data after adding the new entry
            this.fetchEntries(userId);
          },
          (error) => {
            console.error('Error adding entry:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting userId:', error);
      }
    );
  }

  resetFormData() {
    this.formData = {
      date: '',
      time: '',
      symbol: '',
      pnl: '',
      observation: '',
    };
  }

  fetchEntries(userId: string) {
    const url = `http://localhost:3000/journal-entries?userId=${userId}`;

    this.http.get<JournalEntry[]>(url).subscribe(
      (data) => {
        this.entries = data;
      },
      (error) => {
        console.error('Error fetching entries:', error);
      }
    );
  }
}
