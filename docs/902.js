"use strict";(self.webpackChunkfinance_manager=self.webpackChunkfinance_manager||[]).push([[902],{8902:(T,g,a)=>{a.r(g),a.d(g,{RegisterModule:()=>x});var c=a(4341),l=a(2365),t=a(4438),u=a(5646),P=a(1626);let p=(()=>{class n{constructor(){this.http=(0,t.WQX)(P.Qq),this.apiUrl="/api"}register(o,r,e){return this.http.post(`${this.apiUrl}/register`,{email:o,login:r,password:e})}verifyEmail(o,r){return this.http.post(`${this.apiUrl}/email/verify`,{email:o,code:r})}login(o,r){return this.http.post(`${this.apiUrl}/auth/login`,{email:o,password:r})}static#t=this.\u0275fac=function(r){return new(r||n)};static#n=this.\u0275prov=t.jDH({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function m(n){return n.markAllAsTouched(),n.valid}let f=(()=>{class n{constructor(){this.formBuilder=(0,t.WQX)(c.ok)}createEmailVerificationForm(){return this.formBuilder.group({email:"",code:""})}static#t=this.\u0275fac=function(r){return new(r||n)};static#n=this.\u0275prov=t.jDH({token:n,factory:n.\u0275fac})}return n})();var d=a(8685);let O=(()=>{class n{constructor(){this.VALIDATION=u.o,this.emailVerificationFormGroupService=(0,t.WQX)(f),this.authService=(0,t.WQX)(p),this.router=(0,t.WQX)(l.Ix)}ngOnInit(){this.emailVerificationFormGroup=this.emailVerificationFormGroupService.createEmailVerificationForm()}verifyAccount(){if(m(this.emailVerificationFormGroup)){const{email:o,code:r}=this.emailVerificationFormGroup.value;this.authService.verifyEmail(o,r).subscribe({next:e=>{"success"===e.status&&this.router.navigate(["/login"])},error:e=>{console.error("Failed to verify email: ",e)}})}else console.error("Form is invalid")}static#t=this.\u0275fac=function(r){return new(r||n)};static#n=this.\u0275cmp=t.VBU({type:n,selectors:[["finance-manager-email-verification"]],features:[t.Jv_([f])],decls:12,vars:19,consts:[[1,"main-container"],[1,"form-container"],[1,"form-header"],[1,"subtitle"],[3,"formGroup"],[3,"label","type","control","placeholder","iconClassName","required","minlength","maxlength","pattern","allowedCharsPattern"],[3,"label","type","control","placeholder","required","minlength","maxlength","allowedCharsPattern"],[1,"register-button",3,"click"]],template:function(r,e){1&r&&(t.j41(0,"div",0)(1,"div",1)(2,"header",2)(3,"h2"),t.EFF(4,"E-mail Verification"),t.k0s(),t.j41(5,"p",3),t.EFF(6,"Enter verification code that was sent on your e-mail address"),t.k0s()(),t.j41(7,"form",4),t.nrm(8,"fin-man-input",5)(9,"fin-man-input",6),t.k0s(),t.j41(10,"button",7),t.bIt("click",function(){return e.verifyAccount()}),t.EFF(11,"Verify Account"),t.k0s()()()),2&r&&(t.R7$(7),t.Y8G("formGroup",e.emailVerificationFormGroup),t.R7$(),t.Y8G("label","E-mail")("type","email")("control",e.emailVerificationFormGroup.controls.email)("placeholder","E-mail")("iconClassName","email-icon")("required",!0)("minlength",e.VALIDATION.EMAIL.MIN_LENGTH)("maxlength",e.VALIDATION.EMAIL.MAX_LENGTH)("pattern",e.VALIDATION.EMAIL.PATTERN)("allowedCharsPattern","[a-zA-Z0-9@._-]"),t.R7$(),t.Y8G("label","Verification Code")("type","text")("control",e.emailVerificationFormGroup.controls.code)("placeholder","XXXXXX")("required",!0)("minlength",6)("maxlength",6)("allowedCharsPattern","[0-9]"))},dependencies:[d.x,c.qT,c.cb,c.j4],styles:[".subtitle[_ngcontent-%COMP%]{color:#fff;font-size:16px}",".main-container[_ngcontent-%COMP%]{margin:20px;height:100vh;display:flex;justify-content:center;align-items:center}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]{background-color:#242424;border-radius:10px;padding:30px;text-align:center;width:500px}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]{background-color:#444;border-radius:5px;font-size:18px;margin-bottom:80px;width:100%;height:50px;display:flex}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .inner-tab[_ngcontent-%COMP%]{width:50%;height:50px;transition:background-color .3s ease;display:flex;justify-content:center;align-items:center}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .inner-tab-clicked[_ngcontent-%COMP%]{background:linear-gradient(45deg,#1e90ff,#0077ea);color:#fff}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .inner-tab[_ngcontent-%COMP%]:hover{cursor:pointer;background-color:#3c3c3c}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .inner-tab[_ngcontent-%COMP%]:first-child{border-radius:5px 0 0 5px}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .inner-tab[_ngcontent-%COMP%]:last-child{border-radius:0 5px 5px 0}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]{margin-bottom:20px}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#1e90ff;font-size:44px}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;font-size:30px}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .register-button[_ngcontent-%COMP%]{background-color:#1e90ff;border:none;border-radius:5px;color:#fff;font-size:20px;font-weight:600;margin-top:30px;width:100%;height:50px;transition:background-color .3s ease}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .register-button[_ngcontent-%COMP%]:hover{background-color:#0077ea;cursor:pointer}"]})}return n})();function b(n){const s=n.get("password")?.value,o=n?.get("confirmPassword")?.value;if(s&&o)if(s!==o){const r=n.get("password")?.errors||{};n.get("password")?.setErrors({...r,passwordMismatch:!0}),n.get("confirmPassword")?.setErrors({...r,passwordMismatch:!0})}else{const{passwordMismatch:r,...e}=n.get("password")?.errors||{},i=Object.keys(e).length?e:null;n.get("password")?.setErrors(i),n.get("confirmPassword")?.setErrors(i)}}const v=n=>{const s=n.value,o=/[A-Z]/.test(s),r=/[a-z]/.test(s),e=/[0-9]/.test(s),i=/[!@#$%^&*(),.?":{}|<>]/.test(s);return o&&r&&e&&i?null:{passwordStrength:!0}};let h=(()=>{class n{constructor(){this.formBuilder=(0,t.WQX)(c.ok)}createRegisterForm(){return this.formBuilder.group({login:"",email:"",password:["",[v]],confirmPassword:""})}createLoginForm(o){return this.formBuilder.group({email:o.controls.email,password:o.controls.password})}static#t=this.\u0275fac=function(r){return new(r||n)};static#n=this.\u0275prov=t.jDH({token:n,factory:n.\u0275fac})}return n})();var C=a(177);const _=n=>({"inner-tab-clicked":n});function F(n,s){1&n&&(t.j41(0,"h3"),t.EFF(1,"Sign in to your account"),t.k0s())}function A(n,s){if(1&n&&t.nrm(0,"fin-man-input",12),2&n){const o=t.XpG();t.Y8G("label","Username")("control",o.registerFormGroup.controls.login)("placeholder","Username")("iconClassName","username-icon")("required",!0)("minlength",o.VALIDATION.MID_NAME.MIN_LENGTH)("maxlength",o.VALIDATION.MID_NAME.MAX_LENGTH)("pattern","^[a-zA-Z0-9._-]+$")("allowedCharsPattern","[a-zA-Z0-9._-]")}}function w(n,s){if(1&n){const o=t.RV6();t.j41(0,"fin-man-input",13),t.bIt("input",function(){t.eBV(o);const e=t.XpG();return t.Njj(e.confirmPasswordValidator(e.registerFormGroup))}),t.k0s()}if(2&n){const o=t.XpG();t.Y8G("label","Confirm Password")("type","password")("control",o.registerFormGroup.controls.confirmPassword)("placeholder","Confirm Password")("iconClassName","password-icon")("required",!0)("allowedCharsPattern","[a-zA-Z0-9!@#$%^&*()]")}}const I=[{path:"",component:(()=>{class n{static#t=this.\u0275fac=function(r){return new(r||n)};static#n=this.\u0275cmp=t.VBU({type:n,selectors:[["finance-manager-register"]],decls:1,vars:0,template:function(r,e){1&r&&t.nrm(0,"router-outlet")},dependencies:[l.n3],encapsulation:2})}return n})(),children:[{path:"",component:(()=>{class n{constructor(){this.VALIDATION=u.o,this.confirmPasswordValidator=b,this.registerFormGroupService=(0,t.WQX)(h),this.authService=(0,t.WQX)(p),this.router=(0,t.WQX)(l.Ix),this.isLeftActive=!0}ngOnInit(){this.registerFormGroup=this.registerFormGroupService.createRegisterForm()}get title(){return this.isLeftActive?"Create Account":"Welcome!"}get buttonTitle(){return this.isLeftActive?"Get Started":"Sign In"}registerUser(){if(m(this.registerFormGroup)){const{email:o,login:r,password:e}=this.registerFormGroup.value;this.authService.register(o,r,e).subscribe({next:i=>{"success"===i.status&&this.router.navigate(["/login/authorization"])},error:i=>{console.error("Failed to register user: ",i)}})}else console.error("Form is invalid")}loginUser(){const o=this.registerFormGroupService.createLoginForm(this.registerFormGroup);if(m(o)){const{email:r,password:e}=o.value;this.authService.login(r,e).subscribe({next:i=>{"success"===i.status&&console.log("User logged in")},error:i=>{console.error("Failed to register user: ",i)}})}else console.error("Form is invalid")}setActiveTab(o){this.isLeftActive=o}static#t=this.\u0275fac=function(r){return new(r||n)};static#n=this.\u0275cmp=t.VBU({type:n,selectors:[["finance-manager-register-form"]],features:[t.Jv_([h])],decls:20,vars:31,consts:[[1,"main-container"],[1,"form-container"],[1,"tab"],[1,"inner-tab",3,"click","ngClass"],[1,"form-header"],[4,"ngIf"],[3,"formGroup"],[3,"label","control","placeholder","iconClassName","required","minlength","maxlength","pattern","allowedCharsPattern",4,"ngIf"],[3,"label","type","control","placeholder","iconClassName","required","minlength","maxlength","pattern","allowedCharsPattern"],[3,"input","label","type","control","placeholder","iconClassName","required","minlength","maxlength","allowedCharsPattern"],[3,"label","type","control","placeholder","iconClassName","required","allowedCharsPattern","input",4,"ngIf"],[1,"register-button",3,"click"],[3,"label","control","placeholder","iconClassName","required","minlength","maxlength","pattern","allowedCharsPattern"],[3,"input","label","type","control","placeholder","iconClassName","required","allowedCharsPattern"]],template:function(r,e){1&r&&(t.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t.bIt("click",function(){return e.setActiveTab(!0)}),t.j41(4,"p"),t.EFF(5,"Register"),t.k0s()(),t.j41(6,"div",3),t.bIt("click",function(){return e.setActiveTab(!1)}),t.j41(7,"p"),t.EFF(8,"Sign In"),t.k0s()()(),t.j41(9,"header",4)(10,"h2"),t.EFF(11),t.k0s(),t.DNE(12,F,2,0,"h3",5),t.k0s(),t.j41(13,"form",6),t.DNE(14,A,1,9,"fin-man-input",7),t.nrm(15,"fin-man-input",8),t.j41(16,"fin-man-input",9),t.bIt("input",function(){return e.confirmPasswordValidator(e.registerFormGroup)}),t.k0s(),t.DNE(17,w,1,7,"fin-man-input",10),t.k0s(),t.j41(18,"button",11),t.bIt("click",function(){return e.isLeftActive?e.registerUser():e.loginUser()}),t.EFF(19),t.k0s()()()),2&r&&(t.R7$(3),t.Y8G("ngClass",t.eq3(27,_,e.isLeftActive)),t.R7$(3),t.Y8G("ngClass",t.eq3(29,_,!e.isLeftActive)),t.R7$(5),t.JRh(e.title),t.R7$(),t.Y8G("ngIf",!e.isLeftActive),t.R7$(),t.Y8G("formGroup",e.registerFormGroup),t.R7$(),t.Y8G("ngIf",e.isLeftActive),t.R7$(),t.Y8G("label","E-mail")("type","email")("control",e.registerFormGroup.controls.email)("placeholder","E-mail")("iconClassName","email-icon")("required",!0)("minlength",e.VALIDATION.EMAIL.MIN_LENGTH)("maxlength",e.VALIDATION.EMAIL.MAX_LENGTH)("pattern",e.VALIDATION.EMAIL.PATTERN)("allowedCharsPattern","[a-zA-Z0-9@._-]"),t.R7$(),t.Y8G("label","Password")("type","password")("control",e.registerFormGroup.controls.password)("placeholder","Password")("iconClassName","password-icon")("required",!0)("minlength",e.VALIDATION.PASSWORD.MIN_LENGTH)("maxlength",e.VALIDATION.PASSWORD.MAX_LENGTH)("allowedCharsPattern","[a-zA-Z0-9!@#$%^&*()]"),t.R7$(),t.Y8G("ngIf",e.isLeftActive),t.R7$(2),t.SpI(" ",e.buttonTitle," "))},dependencies:[d.x,c.qT,c.cb,c.j4,C.YU,C.bT],styles:[".main-container[_ngcontent-%COMP%]{margin:20px;height:100vh;display:flex;justify-content:center;align-items:center}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]{background-color:#242424;border-radius:10px;padding:30px;text-align:center;width:500px}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]{background-color:#444;border-radius:5px;font-size:18px;margin-bottom:80px;width:100%;height:50px;display:flex}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .inner-tab[_ngcontent-%COMP%]{width:50%;height:50px;transition:background-color .3s ease;display:flex;justify-content:center;align-items:center}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .inner-tab-clicked[_ngcontent-%COMP%]{background:linear-gradient(45deg,#1e90ff,#0077ea);color:#fff}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .inner-tab[_ngcontent-%COMP%]:hover{cursor:pointer;background-color:#3c3c3c}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .inner-tab[_ngcontent-%COMP%]:first-child{border-radius:5px 0 0 5px}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .tab[_ngcontent-%COMP%]   .inner-tab[_ngcontent-%COMP%]:last-child{border-radius:0 5px 5px 0}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]{margin-bottom:20px}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#1e90ff;font-size:44px}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;font-size:30px}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .register-button[_ngcontent-%COMP%]{background-color:#1e90ff;border:none;border-radius:5px;color:#fff;font-size:20px;font-weight:600;margin-top:30px;width:100%;height:50px;transition:background-color .3s ease}.main-container[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   .register-button[_ngcontent-%COMP%]:hover{background-color:#0077ea;cursor:pointer}"]})}return n})()},{path:"authorization",component:O}]},{path:"**",redirectTo:""}];let y=(()=>{class n{static#t=this.\u0275fac=function(r){return new(r||n)};static#n=this.\u0275mod=t.$C({type:n});static#e=this.\u0275inj=t.G2t({imports:[l.iI.forChild(I),l.iI]})}return n})();var E=a(2845);let x=(()=>{class n{static#t=this.\u0275fac=function(r){return new(r||n)};static#n=this.\u0275mod=t.$C({type:n});static#e=this.\u0275inj=t.G2t({imports:[y,E.CommonModule,c.X1]})}return n})()}}]);