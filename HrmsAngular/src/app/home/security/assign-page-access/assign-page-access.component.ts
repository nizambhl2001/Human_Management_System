import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation, animate, style } from '@angular/animations';
import { fadeInAnimation, bounceOutLeftAnimation, show, hide } from '../../../shared/animations';
import { UserTypeModel } from '../../../models/security/user-type.model';
import { UserService } from '../../../services/security/user.service';
import { ApiResponse } from '../../../models/response.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AppInfoService } from '../../../services/security/app-info.service';
import { Helper } from '../../../shared/helper';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../../models/security/user.model';

@Component({
  selector: 'app-assign-page-access',
  templateUrl: './assign-page-access.component.html',
  styleUrls: ['./assign-page-access.component.scss', '../../../../vendor/libs/ng-select/ng-select.scss'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        useAnimation(show, {
          params: {
            duration: '2000ms'
          }
        }),
        animate(200),
      ]),
      transition(':leave', [
        useAnimation(hide, {
          params: {
            duration: '2000ms'
          }
        }),
        animate(200)
      ])
    ])
  ]
})
export class AssignPageAccessComponent implements OnInit {

  isCollapse: boolean;
  title = 'Assign Page in Role';
  companyID: number;
  userTypes: UserTypeModel[] = [];
  users: UserModel[] = [];
  moduleForms: FormArray;
  assignForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private userService: UserService,
    private appInfoService: AppInfoService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {
    this.moduleForms = this.fb.array([]);
  }
  ngOnInit() {
    this.companyID = AuthService.getLoggedCompanyId();
    this.createForm();
    this.getUserTypes();
    this.getAppModules();
    this.getUsers();
  }

  getUserTypes() {
    this.userService.getAllUserType().subscribe((response: ApiResponse) => {
      if (response.status) {
        this.userTypes = (response.result as UserTypeModel[]).filter(c=>c.id!=9);
      }
    })
  }
  getAppModules() {
    this.appInfoService.getAppModule(0)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.createModuleForms(response.result)
        }
      })
  }
  onSelectUserType(userType) {
    if (userType) {
      this.getUsers(userType);
    }else{
      this.getUsers();
    }
  }
  onSelectUser(userId: number) {
    if (!userId) { return; }
    this.appInfoService.getAssignedPagesByUser(userId, this.companyID)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          let assignedPages = response.result as any[];
          this.moduleForms.controls.forEach(mod => {
            if (assignedPages.some(m => m.ModuleID == mod.value.id)) {
              mod.patchValue({ isSelected: true });
              mod['controls'].pages.controls.forEach(page => {
                if (assignedPages.some(c => c.PageID == page.value.id)) {
                  page.patchValue({ isSelected: true })
                } else {
                  page.patchValue({ isSelected: false })
                }
              })
            } else {
              mod.patchValue({ isSelected: false });
              mod['controls'].pages.controls.forEach(page => {
                page.patchValue({ isSelected: false })
              })
            }
          })
        }
        else {
          this.moduleForms.controls.forEach(mod => {
            mod.patchValue({ isSelected: false });
            mod['controls'].pages.controls.forEach(page => {
              page.patchValue({ isSelected: false })
            })
          })
        }
      })
  }
  getUsers(userTypes: number[] = []) {
    this.userService.getUsers(this.companyID, userTypes)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.users = response.result as UserModel[];
        }
      })
  }
  onSubmit() {
    this.isSubmitted = true;
    let assignedModules: any[] = [];
    let selectedModules = this.moduleForms.controls.filter(mod => mod.value.isSelected === true)
    selectedModules.forEach((mod: any) => {
      if (mod.value.isSelected && mod.value.pages.some(c => c.isSelected)) {
        let assignedPages: any[] = [];
        mod.value.pages.forEach((p: any) => {
          if (p.isSelected == true) {
            assignedPages.push(p);
          }
        })
        let selectedModPage = { id: mod.value.id, name: mod.value.name, pages: assignedPages }
        assignedModules.push(selectedModPage)
      }
    })
    this.assignForm.patchValue({
      modules: assignedModules,
      companyID: this.companyID
    })
    if (this.assignForm.invalid) {
      this.toaster.error('Check the red marked field', 'Invalid Submission!');
      return;
    }
    if (this.assignForm.value.userID == AuthService.getLoggedUserId()) {
      this.toaster.error('You can\'t assign page for yourself');
      return;
    }
    //Calling Service
    this.appInfoService.assignPageInUser(this.assignForm.value)
      .subscribe((response: ApiResponse) => {
        if (response.status) {
          this.toaster.success(response.result, 'Success')
          this.isSubmitted = false;
        } else {
          this.toaster.error(response.result, 'Failed')
        }
      })
  }
  onSelectModule(moduleId: number, isChecked: boolean, ) {
    this.moduleForms.controls
      .find(mod => mod.value.id === moduleId)['controls']
      .pages['controls'].forEach(page => {
        page['controls'].isSelected.patchValue(isChecked)
      })
  }
  onSelectPage(moduleId: number) {
    if (this.moduleForms.controls.find(m => m.value.id == moduleId).value.pages.some(c => c.isSelected)) {
      this.moduleForms.controls.find(m => m.value.id == moduleId).patchValue({ isSelected: true });
    } else {
      this.moduleForms.controls.find(m => m.value.id == moduleId).patchValue({ isSelected: false });
    }
  }
  createForm() {
    this.assignForm = this.fb.group({
      id: [, []],
      userTypeID: [, []],
      userID: [, [Validators.required]],
      companyID: [, [Validators.required]],
      modules: [, []]
    })
  }
  get frmControl() {
    return this.assignForm.controls;
  }

  createPageForms(pages: any[]): FormArray {
    let pageForms: FormArray = this.fb.array([]);
    pages.forEach(page => {
      pageForms.push(new FormGroup({
        id: new FormControl(page.id),
        moduleId: new FormControl(page.moduleID),
        name: new FormControl(page.name),
        isSelected: new FormControl(false)
      }))
    })
    return pageForms;
  }

  createModuleForms(modules: any[]) {
    (modules).forEach(mod => {
      this.moduleForms.push(new FormGroup({
        id: new FormControl(mod.id, []),
        name: new FormControl(mod.name, []),
        pages: this.createPageForms(mod.pages),
        isSelected: new FormControl(false, [])
      }))
    })
  }

}
