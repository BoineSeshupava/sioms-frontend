import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { UserProfile, UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  profile: UserProfile = { id: '', name: '', email: '', role: '' };

  constructor(private profileService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  update(): void {
    this.profileService.updateProfile(this.profile).subscribe(() => {
      alert('Profile updated successfully!');
    });
  }
}
