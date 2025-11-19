import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  activeTab: string = 'profile';

  saveChanges() {
    alert('Settings saved successfully!');
  }

  logout() {
    alert('Logged out successfully!');
  }

  deleteAccount() {
    const confirmDelete = confirm('Are you sure you want to delete your account?');
    if(confirmDelete) {
      alert('Account deleted successfully!');
    }
  }
}

