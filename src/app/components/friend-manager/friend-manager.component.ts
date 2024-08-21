import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FriendsService } from '../../services/friend.service';

@Component({
  selector: 'app-friend-manager',
  templateUrl: './friend-manager.component.html',
  styleUrls: ['./friend-manager.component.scss']
})
export class FriendManagerComponent implements OnInit {
  friendForm: FormGroup;
  friends: any[] = [];

  constructor(
    private fb: FormBuilder,
    private friendsService: FriendsService,
    private router: Router
  ) {
    this.friendForm = this.fb.group({
      username: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadFriends();
  }

  addFriend(): void {
    if (this.friendForm.valid) {
      const username = this.friendForm.get('username')?.value;
      this.friendsService.addFriend(username).subscribe({
        next: () => {
          alert('Friend request sent.');
          this.loadFriends(); 
          this.friendForm.reset(); 
        },
        error: (err) => alert('Error adding friend: ' + err.message)
      });
    }
  }

  acceptFriend(username: string): void {
    this.friendsService.acceptFriend(username).subscribe({
      next: () => {
        alert('Friend request accepted.');
        this.loadFriends(); 
      },
      error: (err) => alert('Error accepting friend: ' + err.message)
    });
  }

  blockFriend(username: string): void {
    this.friendsService.blockFriend(username).subscribe({
      next: () => {
        alert('Friend blocked.');
        this.loadFriends(); 
      },
      error: (err) => alert('Error blocking friend: ' + err.message)
    });
  }

  loadFriends(): void {
    this.friendsService.listFriends().subscribe({
      next: (data) => this.friends = data,
      error: (err) => alert('Error loading friends: ' + err.message)
    });
  }

  returnDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
