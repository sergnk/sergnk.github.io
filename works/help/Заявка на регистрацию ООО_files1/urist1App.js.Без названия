var urist1App = angular.module("urist1App", ["mgcrea.ngStrap", "ngAnimate"]);

//директива по работе с файлами
urist1App.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

/***главный контроллер проекта***/
urist1Ctrl = urist1App.controller("urist1Ctrl", function ($scope) {

    //шаблоны всех инлайновых форм сайта
    $scope.formTpl = {
              inlineRegistrationOOO : "/includes/forms/templates/inlineRegistrationOOO/form.tpl"
             };


});


inlineRegistrationOOOCtrl = urist1App.controller("inlineRegistrationOOOCtrl", function ($scope, $http) {

    $scope.ButtonText = "Отправить";
    $scope.success = false;
    $scope.waiting = false;

    $scope.block2Show = false;
    $scope.block3Show = false;
    $scope.block4Show = false;

    $scope.button1Show = true;
    $scope.button2Show = true;
    $scope.button3Show = true;

    $scope.SuccessMessage = false;


    //исходные данные формы
    $scope.sourceData = {
              inputSelect0Data :[
                {name: "Руб", value: "Руб"},
                {name: "USD", value: "USD"},
                {name: "EUR", value: "EUR"}
              ],
              inputRadio0Data : [
                {value: "Уже имеется", need: "no"},
                {value: "Нужно предоставить", need: "yes"}
              ]
    }


    //данные формы для отправки
    $scope.formData = {
              sections: {
                  section_1: {
                      sectionName: "Информация о компании",
                      sectionData: {
                            inputText :[
                              {name: "Полное наименование на русском языке", value: "", placeholder: "Полное наименование на русском языке", required: true},
                              {name: "Сокращенное наименование на русском языке", value: "", placeholder: "Сокращенное наименование на русском языке", required: true},
                              {name: "Полное наименование на иностранном языке", value: "", placeholder: "Полное наименование на иностранном языке", required: false},
                              {name: "Сокращенное наименование на иностранном языке", value: "", placeholder: "Сокращенное наименование на иностранном языке", required: false},
                              {name: "Величина уставного капитала", value: "", placeholder: "Величина уставного капитала", required: false},
                              {name: "Основной вид деятельности", value: "", placeholder: "Основной вид деятельности", required: false},
                              {name: "Дополнительный вид деятельности", value: [{value: ""}]}
                            ],
                            inputSelect : [
                              {name: "Валюта уставного капитала", value: $scope.sourceData.inputSelect0Data[0]},
                            ]
                      }

                  },
                  section_2: {
                      sectionName: "Учредители и их доля в уставном капитале",
                      sectionData: [{
                            inputText :[
                              {name: "ФИО", value: "", placeholder: "ФИО", required: true},
                              {name: "ИНН", value: "", placeholder: "ИНН", required: true},
                              {name: "Доля в уставном капитале", value: "", placeholder: "Доля в уставном капитале", required: true},
                            ],
                            inputSelect : [
                              {name: "Валюта доли", value: $scope.sourceData.inputSelect0Data[0]}
                            ],
                            inputCheckbox : [
                              {name: "Генеральный директор", value: false}
                            ]
                      }]

                  },
                   section_3: {
                      sectionName: "Юридический адрес",
                      sectionData: {
                            inputText :[
                              {name: "Город", value: "", placeholder: "Москва", required: true},
                              {name: "Адрес", value: "", placeholder: "Введите адрес в любом формате", label: "Например: ул. Молодежная 12/2, оф. 52", required: true, },
                              {name: "Индекс", value: "", placeholder: "Векдите индекс", label: "123800", required: true},
                            ],
                            inputRadio : [
                              {name: "Юридический адрес", value: $scope.sourceData.inputRadio0Data[1].value}
                            ]
                      }

                  },
                   section_4: {
                      sectionName: "Информация для связи",
                      sectionData: {
                            inputText :[
                              {name: "Имя", value: "", placeholder: "Как к вам обращаться", required: true},
                              {name: "Телефон", value: "", placeholder: "Как с вами связаться", label: "например: 89261722323", required: true},
                              {name: "Email", value: "", placeholder: "Введите e-mail", required: true},
                            ]
                      }

                  }

              },
              system: {
                  subject : "Поступила заявка на регистрацию ООО!", //тема письма
                  norobots: false, //защита от роботов
                  inputFile: [
                    {data: ""}
                  ]
              }

            }

        $scope.addDop = function(){
            $scope.formData.sections.section_1.sectionData.inputText[6].value.push({value: ""});
        }
        $scope.checkAddress = function(need){
            if(need == "yes"){
              $scope.need_address = true;
            }else{
              $scope.need_address = false;
            }
        }

        $scope.addStep2 = function(gendir){
          if(gendir == "gendir"){
            var checked = true;
          }else{
            var checked = false;
          }
            $scope.formData.sections.section_2.sectionData.push({
                inputText :[
                  {name: "ФИО", value: "", placeholder: "ФИО", required: true},
                  {name: "ИНН", value: "", placeholder: "ИНН", required: true},
                  {name: "Доля в уставном капитале", value: "", placeholder: "Доля в уставном капитале", required: true},
                ],
                inputSelect : [
                  {name: "Валюта доли", value: $scope.sourceData.inputSelect0Data[0]}
                ],
                inputCheckbox : [
                  {name: "Генеральный директор", value: checked}
                ]
            });
        }
        //функция-обработчик отправки данных формы
        $scope.send = function(formData, isvalid){
                $scope.waiting = true;
                $scope.ButtonTextOld = $scope.ButtonText;
                $scope.ButtonText = "Подождите...";
                    if (isvalid) {
                      $http.post("/includes/forms/action.php", formData)
                        .success(function (data) {
                              if(data.status == "OK"){
                                      $scope.success = true;
                                      $scope.SuccessMessage = true;
                                      $scope.waiting = false;
                              }else{
                                      $scope.waiting = false;
                                      $scope.success = false;
                              }
                              $scope.showError = false;
                        });
                    }
                    else {
                        $scope.showError = true;
                        $scope.ButtonText = $scope.ButtonTextOld;
                    }

        }

        $scope.show_step = function(next_block){
              if(next_block == 2){
                $scope.block2Show = true;
                $scope.button1Show = false;
              } 
              if(next_block == 3){
                $scope.block3Show = true;
                $scope.button2Show = false;
              } 
              if(next_block == 4){
                $scope.block4Show = true;
                $scope.button3Show = false;
              } 
        }


});