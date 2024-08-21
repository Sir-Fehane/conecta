import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private friendService: FriendService
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
      this.friendService.addFriend(username).subscribe({
        next: () => {
          alert('Friend request sent.');
          this.loadFriends(); // Refresh the list
        },
        error: (err) => alert('Error adding friend: ' + err.message)
      });
    }
  }

  acceptFriend(username: string): void {
    this.friendService.acceptFriend(username).subscribe({
      next: () => {
        alert('Friend request accepted.');
        this.loadFriends(); // Refresh the list
      },
      error: (err) => alert('Error accepting friend: ' + err.message)
    });
  }

  blockFriend(username: string): void {
    this.friendService.blockFriend(username).subscribe({
      next: () => {
        alert('Friend blocked.');
        this.loadFriends(); // Refresh the list
      },
      error: (err) => alert('Error blocking friend: ' + err.message)
    });
  }

  loadFriends(): void {
    this.friendService.listFriends().subscribe({
      next: (data) => this.friends = data,
      error: (err) => alert('Error loading friends: ' + err.message)
    });
  }
}
