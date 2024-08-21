
import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  roomForm: FormGroup;
  creator: string | null = null;
  friendForm: FormGroup;
  code: number | null = null;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {
    this.roomForm = this.fb.group({
      code: ['', [Validators.required]],
    });

    this.friendForm = this.fb.group({
      username: ['', [Validators.required]],
    });
  }

  createRoom(): void {
    this.gameService.createRoom().subscribe({
      next: (response) => {
        this.code = response.numsala;
        this.creator = response.creator;
        this.router.navigate(['/room', this.code]);
      },
      error: (err) => alert('Error creating room: ' + err.message)
    });
  }

  joinRoom(): void {
    if (this.roomForm.valid) {
      const numsala = this.roomForm.get('code')?.value;
      this.gameService.joinRoom(numsala).subscribe({
        next: () => {alert('Joined room.')
        this.router.navigate(['/room', numsala]);
        },
        error: (err) => alert('Error joining room: ' + err.message)
      });
    }
  }

  joinRoomByFriend(): void {
    if (this.friendForm.valid) {
      const friendId = this.friendForm.get('username')?.value;
      this.gameService.joinRoomByFriend(friendId).subscribe({
        next: () => alert('Joined friend\'s room.'),
        error: (err) => alert('Error joining friend\'s room: ' + err.message)
      });
    }
  }

  Friends(): void {
    this.router.navigate(['/friends']);
  }
}
