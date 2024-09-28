import { RelationshipComponent } from './relationship/relationship.component';
import { UnitComponent } from './unit/unit.component';
import { SignatoryComponent } from './signatory/signatory.component';
import { SectionComponent } from './section/section.component';
import { OccupationComponent } from './occupation/occupation.component';
import { MisconductComponent } from './misconduct/misconduct.component';
import { LocationComponent } from './location/location.component';
import { JobTypeComponent } from './job-type/job-type.component';
import { InstituteComponent } from './institute/institute.component';
import { DesignationComponent } from './designation/designation.component';
import { DepartmentGlComponent } from './department-gl/department-gl.component';
import { CountryComponent } from './country/country.component';
import { BranchComponent } from './branch/branch.component';
import { BloodGroupComponent } from './blood-group/blood-group.component';
import { BankComponent } from './bank/bank.component';
import { DepartmentComponent } from './department/department.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpInfoComponent } from './emp-info/emp-info.component';
import { EducationBoardComponent } from './education-board/education-board.component';
import { EducationLevelComponent } from './education-level/education-level.component';
import { ExperienceTypeComponent } from './experience-type/experience-type.component';
import { GenderComponent } from './gender/gender.component';
import { NationalityComponent } from './nationality/nationality.component';
import { PassingYearComponent } from './passing-year/passing-year.component';
import { PrefixComponent } from './prefix/prefix.component';
import { SuffixComponent } from './suffix/suffix.component';
import { ProjectComponent } from './project/project.component';
import { PublicationTypeComponent } from './publication-type/publication-type.component';
import { PunishmentComponent } from './punishment/punishment.component';
import { ReligionComponent } from './religion/religion.component';
import { ResultComponent } from './result/result.component';
import { TrainingCountryComponent } from './training-country/training-country.component';
import { TrainingInstituteComponent } from './training-institute/training-institute.component';
import { TrainingNatureComponent } from './training-nature/training-nature.component';
import { TrainingSponsorByComponent } from './training-sponsor-by/training-sponsor-by.component';
import { TrainingTypeComponent } from './training-type/training-type.component';
import { PageGuard } from '../../../guards/page.guard';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { ThanaComponent } from './thana/thana.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([
    {path:'bank', canActivate: [PageGuard], data:{pageId:1}, component: BankComponent},
    {path:'blood-group',canActivate: [PageGuard], data:{pageId:1}, component: BloodGroupComponent},
    {path:'branch',canActivate: [PageGuard], data:{pageId:1}, component: BranchComponent},
    {path:'country',canActivate: [PageGuard], data:{pageId:1}, component: CountryComponent},
    {path:'department',canActivate: [PageGuard], data:{pageId:1}, component: DepartmentComponent},
    {path:'department-gl',canActivate: [PageGuard], data:{pageId:1}, component: DepartmentGlComponent},
    {path:'designation',canActivate: [PageGuard], data:{pageId:1}, component: DesignationComponent},
    {path:'education-board',canActivate: [PageGuard], data:{pageId:1}, component: EducationBoardComponent },
    {path:'education-level',canActivate: [PageGuard], data:{pageId:1}, component: EducationLevelComponent},
    {path:'emp-info',canActivate: [PageGuard], data:{pageId:1}, component: EmpInfoComponent},
    {path:'experience-type',canActivate: [PageGuard], data:{pageId:1}, component: ExperienceTypeComponent},
    {path:'gender',canActivate: [PageGuard], data:{pageId:1}, component: GenderComponent},
    {path:'institute',canActivate: [PageGuard], data:{pageId:1}, component: InstituteComponent},
    {path:'job-type',canActivate: [PageGuard], data:{pageId:1}, component: JobTypeComponent},
    {path:'location',canActivate: [PageGuard], data:{pageId:1}, component: LocationComponent},
    {path:'misconduct',canActivate: [PageGuard], data:{pageId:1}, component: MisconductComponent},
    {path:'nationality',canActivate: [PageGuard], data:{pageId:1}, component: NationalityComponent},
    {path:'occupation',canActivate: [PageGuard], data:{pageId:1}, component: OccupationComponent},
    {path:'passing-year',canActivate: [PageGuard], data:{pageId:1}, component: PassingYearComponent},
    {path:'prefix',canActivate: [PageGuard], data:{pageId:1}, component: PrefixComponent},
    {path:'project',canActivate: [PageGuard], data:{pageId:1}, component: ProjectComponent},
    {path:'publication-type',canActivate: [PageGuard], data:{pageId:1}, component: PublicationTypeComponent},
    {path:'punishment',canActivate: [PageGuard], data:{pageId:1}, component: PunishmentComponent},
    {path:'religion',canActivate: [PageGuard], data:{pageId:1}, component: ReligionComponent},
    {path:'result',canActivate: [PageGuard], data:{pageId:1}, component: ResultComponent},
    {path:'section',canActivate: [PageGuard], data:{pageId:1}, component: SectionComponent},
    {path:'signatory',canActivate: [PageGuard], data:{pageId:1}, component: SignatoryComponent},
    {path:'suffix',canActivate: [PageGuard], data:{pageId:1}, component: SuffixComponent},
    {path:'training-country',canActivate: [PageGuard], data:{pageId:1}, component: TrainingCountryComponent},
    {path:'training-institute',canActivate: [PageGuard], data:{pageId:1}, component: TrainingInstituteComponent},
    {path:'training-nature',canActivate: [PageGuard], data:{pageId:1}, component: TrainingNatureComponent},
    {path:'training-sponsor-by',canActivate: [PageGuard], data:{pageId:1}, component: TrainingSponsorByComponent},
    {path:'training-type',canActivate: [PageGuard], data:{pageId:1}, component: TrainingTypeComponent},
    {path:'unit',canActivate: [PageGuard], data:{pageId:1}, component: UnitComponent},
    {path:'document-type',canActivate: [PageGuard], data:{pageId:1}, component: DocumentTypeComponent},
    {path:'thana', component: ThanaComponent},
    {path:'relationship', component: RelationshipComponent},
  ])],
exports:[RouterModule]
})
export class BasicEntryRoutingModule { }
