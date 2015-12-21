
describe('clinical:hipaa-audit-log', function () {
  var server = meteor();
  var client = browser(server);

  beforeEach(function () {
    server.execute(function () {

    }).then(function (value){

    });
  });
  afterEach(function () {
    server.execute(function () {

    });
  });

  it('HipaaLogger should exist on the client', function () {
    return client.execute(function () {
      expect(HipaaLogger).to.exist;
    });
  });

  it('HipaaLogger should exist on the server', function () {
    return server.execute(function () {
      expect(HipaaLogger).to.exist;
    });
  });


  it("Hipaa.Logger can log events on the client", function () {
    return client.execute(function () {
      HipaaLogger.logEvent({
        eventType: "modified",
        userId: "janedoe",
        userName: "Jane Doe",
        collectionName: "Medications",
        recordId: "123",
        patientId: "123",
        patientName: "abc"
      });
      return Hipaa.findOne();
    }).then(function (eventRecord){
      server.wait(500, "", function (){
        expect(eventRecord).to.exist;
        expect(eventRecord.userId).to.equal("janedoe");
        expect(eventRecord.userName).to.equal("Jane Doe");
      });
    });
  });
  it("Hipaa.Logger can log events on the server", function () {
    return server.execute(function () {
      HipaaLogger.logEvent({
        eventType: "modified",
        userId: "janedoe",
        userName: "Jane Doe",
        collectionName: "Medications",
        recordId: "123",
        patientId: "123",
        patientName: "abc"
      });

      var eventRecord = Hipaa.findOne();

      expect(eventRecord).to.exist;
      expect(eventRecord.userId).to.equal("janedoe");
      expect(eventRecord.userName).to.equal("Jane Doe");
    });
  });

});