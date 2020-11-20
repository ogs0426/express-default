function myClass(name, description) {
    this.name = name;
    this.description = description;
   };
   
   var proto = myClass.prototype;
   
   proto.setName = function(name){
    this.name = name;
   };
   
   proto.getName = function() {

    var aarry = [];

    aarry.splice

    return this.name;
   };
   
   proto.setDescription = function(description) {
    this.description = description;
   };
   
   proto.getDescription = function() {
    return this.description;
   };
   
   proto.printInfo = function () {
      console.log('name : ' + this.name);
      console.log('description : ' + this.description);
};

module.exports = myClass;
