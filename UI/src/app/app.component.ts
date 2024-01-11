import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular - Qraph-QL Demo';
  userList: any;

  modalTitle: string = "Add User";
  fname: string = "";
  lname: string = "";
  phone: string = "";
  email: string = "";
  userID: string = "";
  
  @ViewChild('closeModal') closeModal: any;

  constructor(private userService: UserService,
    private toastr: ToastrService) {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().then(data => {
      this.userList = data;
    });
  }


  userAddEdit(type: string, user: any = null) {
    if (type == "Add") {
      this.modalTitle = "Add";
      this.userID = "";
      this.fname = "";
      this.lname = "";
      this.phone = "";
      this.email = "";
    }
    else {
      this.modalTitle = "Edit";
      this.userID = user.id;
      this.fname = user.fname;
      this.lname = user.lname;
      this.phone = user.phone;
      this.email = user.email;
    }
  }

  confirmAddEdit(userForm:any) {

    if(userForm.form.valid){
      if (this.modalTitle == "Add") {
        this.userService.addUser({ 'fname': this.fname, 'lname': this.lname, 'phone': this.phone, 'email': this.email, }).then(data => {
            this.getUserList();
            this.toastr.success("User Added Successfully.");
            this.closeModal.nativeElement.click();
        });
      }
      else {
        //Edit     
        this.userService.editUser({ 'id': this.userID, 'fname': this.fname, 'lname': this.lname, 'phone': this.phone, 'email': this.email, }).then(data => {
            this.getUserList();
            this.toastr.success("User Updated Successfully.");               
            this.closeModal.nativeElement.click();       
        });
      }
    }
    else{
      this.toastr.error("Please fill the form to proceed");
    }
  }

  userDelete(userId: string) {
    this.userID = userId;
  }
  confirmDelete() {
    this.userService.deleteUser({ 'id': this.userID }).then(data => {
        this.getUserList();
        this.toastr.success("User Deleted Successfully.");
    });
  }

}
