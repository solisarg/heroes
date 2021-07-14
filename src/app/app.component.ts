import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';
import { Component, ComponentFactoryResolver } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { delay } from 'rxjs/operators';
import { LoadingService } from './services/loading.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading:boolean = false;
  title = 'heroes';
  private timeout:number = 5000;
  private timeoutInterval;

  constructor(
    private _loading:LoadingService
  ){ }

  ngOnInit() {
    this.listenToLoading();
    this.closestNumbers([6,2,4,10])
    //this.maxSubsetSum([3, 5, -7, 8, 10])
/*console.log(this.abbreviation('OPZFFVQLADBQFBXLOSUMZZWQUKASCUVQZZVWfPIRTytlvpijddqegbwitkhhsbuehtnpndvcandzjzyepvlnkayfkwzegvbratvwezddjqxrxocqgcghuohlmsondvicocltqhvqfqjpctxfomjoukrheijhhndcbipiobvpbskemgykepokluwqhhejdaimvdvlegfyrrwckgojsbsxmsvhhrlnvcrxfaxinjzsjgvvrlcczqlkvgtftsvktvhtfpaklumhkovphilrappbvkarfhvwxxtrugypracozyqyvaqjityoiyemyavpbchaoagrvujocpueczsgcqdjvkjckxhmnaseshjgecusrxozuxgeieleewwskmiprlqnshvmcp','OPZFFVQLADBQFBXLOSUMZZWQUKASCUVQZZVWPIRT'));
console.log(this.abbreviation('WLWlVFFTKWXXVNXUAHAWBKCQMKEHKSJNLLISGUWMDTkURJTLXyJFEHQYTCuRFXRDHSFPIRCCQSDRRHCSDPKXGOCHFAWKPGMCZICTFFTNZBANHHELBMAWVPRekbsqbxqqwsizsjnnorxamaoudznbaqanqtucsrouxcdxfqahygyupaxfvtvigahlkpoduwmgvbvwshvazgsjkimnbjvzvwtdlomsfatfxxsfdvxcyfiycehomhhaaginwnrtoqtkhvmjikzymaqppjbtjomfjn','WLWVFFTKWXXVNXUAHAWBKCQMKEHKSJNLLISGUWMDTURJTLXJFEHQYTCRFXRDHSFPIRCCQSDRRHCSDPKXGOCHFAWKPGMCZICTFFTNZBANHHELBMAWVPR'));
console.log(this.abbreviation('PDXCyKDOkWPOTXQUEQHOEIaIAROHeAXrGISVQbnksreozjryuzlttptkufhzaqejqszwsscpsbrfjrqaixtfvazzihgrnkgrultyewhaniegnzqapbzugermphypdryqcobcglcytzcysjbuchazswrvckkmwgityneeyqeflcyhesmdhsskudnsuqtlvpplothlpilpffyuyvnjvymiwrrqappuwbinbgcb','PDXCKDOWPOTXQUEQHOEIIAROHAXGISVQ'));
console.log(this.abbreviation('RUJNEGMMMEGIRGILRHKWKSNZWMQAFKISNVVBOVNZBHRITDHZIKHXuZRRJOVNHIKLBIZTTHQCDRDDPQIWIJRAKXSAFKNZQQTUCGYBKKIFJBKYDLICJZZCDSHRCKRNXTNZAKNNFPLCLBMJJGOZLIIJYFIMYHPNHLXGZICXOCDNWKKEMGOSJUGVXIEGBWLNGXUQNBWKJIUURRBZYBKEVUSDUpAUQKVANNJWNJZZAIJCYTJPUMIYAFJKBBCEDOGWVUCTBRhHXTTZDFTPYTypxornxsclmxzsuwaqlsjwpztodbwnowpplxcvbpubodwobdlwphmcyenwdjwdzwblrejfhvoprxsiekxz','RUJNEGMMMEGIRGILRHKWKSNZWMQAFKISNVVBOVNZBHRITDHZIKHXZRRJOVNHIKLBIZTTHQCDRDDPQIWIJRAKXSAFKNZQQTUCGYBKKIFJBKYDLICJZZCDSHRCKRNXTNZAKNNFPLCLBMJJGOZLIIJYFIMYHPNHLXGZICXOCDNWKKEMGOSJUGVXIEGBWLNGXUQNBWKJIUURRBZYBKEVUSDUAUQKVANNJWNJZZAIJCYTJPUMIYAFJKBBCEDOGWVUCTBRHXTTZDFTPYT'));
*/
//console.log(this.abbreviation('CIVQEESyFYnGDSSUUUGMPXYUKRMLXRXtWAWKQRUWCXKBMTGDOWSPRFOCUOETTLIWeXTUHSSPWYQKJSIlRJGOIDARFIILFXQUBCXUQHJCtJXTJBOSJKJUAIFaBVQWBXWZIYRMYOCVYGTCJJjDMBAESZlXMDPIREZHVJGJQHAFQGGXLzIEAPcZGBOEHDXQIUDfBEYQOjTYJUJVTWEIXcBUYEyXHPDYAEHOZDPHAQAYEQNKoVBOOMTUOJHyFOLRmVKMwFVCJMTAMFVPAGYYIBZZLCPJYXLWXMHLVXXQOGSZKGZZOENOSNHJNOMXxNMRZGODIUnEZGRDFLNuZJASKXHMSJGIWGIUYWPPXQQZYDSISXFQRPLHFPHMZMGMVOLXeJWYZOZUEOHWZOFUQEGEGLPRISELSNHIGDlLqEDCCDJYKAFTLLPIYUQENFuWJJFHUAECO','CIVQEESFYGDSSUUUGMPXYUKRMLXRXWAWKQRUWCXKBMTGDOWSPRFOCUOETTLIWXTUHSSPWYQKJSIRJGOIDARFIILFXQUBCXUQHJCJXTJBOSJKJUAIFBVQWBXWZIYRMYOCVYGTCJJDMBAESZXMDPIREZHVJGJQHAFQGGXLIEAPZGBOEHDXQIUDBEYQOTYJUJVTWEIXBUYEXHPDYAEHOZDPHAQAYEQNKVBOOMTUOJHFOLRVKMFVCJMTAMFVPAGYYIBZZLCPJYXLWXMHLVXXQOGSZKGZZOENOSNHJNOMXNMRZGODIUEZGRDFLNZJASKXHMSJGIWGIUYWPPXQQZYDSISXFQRPLHFPHMZMGMVOLXJWYZOZUEOHWZOFUQEGEGLPRISELSNHIGDLEDCCDJYKAFTLLPIYUQENFWJJFHUAECOMN'));
/*console.log(this.abbreviation('VUWELCNJMNWLMJLZRASXaZCTBXKLLELZNWNZXNBTAPKRBBsXBJHMBDPDQDIFCXHXWNVMTFHSNAJhRSUAIAXLNICSBCIOLOAMAOAPGJVXEFBGEFCKQzMAFTVZKMGIXEKVWMbQPZTFHVLSQGBXEaFRKAMMICCGDPXWGZTGJWRCRBQIpCRBIAYRDXLMWNGEUMELKAZANQBLKTTVKQJOSZRNHUJBNDFTNFJVUNrGWKWALLBERYEgXMSXRMWHKQIFRQELUHOFGVyLESCNBWOSTOPRQYIDDTWNUCrBOOUMTLKNDRXTDPGQQERPFRJQEGEFLDUayvvmqaaypkxezuhsopxexsnfdaxc','VUWELCNJMNWLMJLZRASXZCTBXKLLELZNWNZXNBTAPKRBBXBJHMBDPDQDIFCXHXWNVMTFHSNAJRSUAIAXLNICSBCIOLOAMAOAPGJVXEFBGEFCKQMAFTVZKMGIXEKVWMQPZTFHVLSQGBXEFRKAMMICCGDPXWGZTGJWRCRBQICRBIAYRDXLMWNGEUMELKAZANQBLKTTVKQJOSZRNHUJBNDFTNFJVUNGWKWALLBERYEXMSXRMWHKQIFRQELUHOFGVLESCNBWOSTOPRQYIDDTWNUCBOOUMTLKNDRXTDPGQQERPFRJQEGEFLDU'));
console.log(this.abbreviation('ETAUMPZFGJVEUUBFDIMJPMOCRQXMMMYPUKFRJLCXOCLMUMMUHQNKIAZSKHRLPNhRRPmNIBNCHRZBYWAPUNMDFGPDKQUBZYPEIZILJEHNZGHSNSRZACYCKQSSFHEDYCMVAovcuyjahwtmgcctvjqnpgwrurwnmbifbtyqyuoafezegpecjgmkwfstjwlkromioak','ETAUMPZFGJVEUUBFDIMJPMOCRQXMMMYPUKFRJLCXOCLMUMMUHQNKIAZSKHRLPNRRPNIBNCHRZBYWAPUNMDFGPDKQUBZYPEIZILJEHNZGHSNSRZACYCKQSSFHEDYCMVA'));
console.log(this.abbreviation('KBJYYWPSOMDASRHPARGRyOZaAOEWVDTRWRKVGsgRWeVWCUVTCLYLGLZQAUHOOLJKPUCTCYJIWOKkEGRAOJAQLZABAYXHBdLptHZYVFMZCCGAQJShlHXHVCZFCBGPZDZGQHFVGLHBBvDNSUPYNJMOYHZMXRAHUZHCjNtTWSJGDUKJbRBgJRTVtHGHLKKTHBMtPMQVTKNRNOlSCBMXWJJZHFTHBNMNOBBYQTDXREdHwVBHQqKUSEDVYAEcYLGGvQKaUORVFUOFPTXGGQiLOKFRkGXBYNEQZXDFQBmPvFBUFEBNOFVQHjRJVQHsPJNXBOTKLMVRDPHXNNHwVPlKQJLWUYYAFOIUNhARELQUaBYxHRFqXGLRMFGOMPRKLZLRNRJDLJHDLMHKALTKSW','KBJYYWPSOMDASRHPARGROZAOEWVDTRWRKVGRWVWCUVTCLYLGLZQAUHOOLJKPUCTCYJIWOKEGRAOJAQLZABAYXHBLHZYVFMZCCGAQJSHXHVCZFCBGPZDZGQHFVGLHBBDNSUPYNJMOYHZMXRAHUZHCNTWSJGDUKJRBJRTVHGHLKKTHBMPMQVTKNRNOSCBMXWJJZHFTHBNMNOBBYQTDXREHVBHQKUSEDVYAEYLGGQKUORVFUOFPTXGGQLOKFRGXBYNEQZXDFQBPFBUFEBNOFVQHRJVQHPJNXBOTKLMVRDPHXNNHVPKQJLWUYYAFOIUNARELQUBYHRFXGLRMFGOMPRKLZLRNRJDLJHDLMHKALTKSWGTVBRLNKGBW'));
console.log(this.abbreviation('UZJMUCYHpfeoqrqeodznwkxfqvzktyomkrVyzgtorqefcmffauqhufkpptaupcpxguscmsbvolhorxnjrheqhxlgukjmgncwyastmtgnwhrvvfgbhybeicaudklkyrwvghpxbtpyqioouttqqrdhbinvbywkjwjkdiynvultxxxmwxztglbqitxmcgiusfewmsvxchkryzxipbmgrnqhfmlghomfbsKjglimxuobomfwutwfcmklzcphbbfohnaxgbaqbgocghaaizyhlctupndmlhwwlxxvighhjjrctcjBvxtagxbhrbrWwsyiiyebdgyfrlztoycxpjcvmzdvfeYqaxitkfkkxwybydcwsbdiovrqwkwzbgammwslwmdesygopzndedsbdixvi','UZJMUCYH'));
console.log(this.abbreviation('AITDVQYyBXUHBBTXvJOCCHGHXPWOYEHSKNAQHSDIWJHKDYMODFAYKNYAJUFCQZPAVTZYPbJFRDYSuDNYMFRKADBTQOBXSNeWDQYHBSLMTDdZiUJECURIEBZPNRByMAQNNGXGHAWTOKAKOAVgPDEAOEPSZHGNISBHVLIDRMNAFBHGPBYRhdJEPKLOOlYnJYXEOSWCOGEEWJDPKQXEDGUSZSAYzWLWQEVFHBTLAFTFZTXkQJWEHVaRFNTAEQDJVYKSBAFNUfGJMByRKINGTSLBIEDCMFOHGmICOCKGPZXHglLBUWUUTTSBNVQceMIEwKAOWAANJYqYKoYIOXtYHDKDNVVZOKPJvTLKoKBJMAEMSVUFKYQTSGXNDQLEAdUAzIXGOSWCLXFVTAWSQDWDCLdARUIQRFRSMBQACKAGLMGYFCCJMTLSOEPJXIIIZSPBXvHeYFVMjcarjwckioyvkzzjfytwcqzkrqukjxhvmywrcbulvznma','AITDVQYBXUHBBTXJOCCHGHXPWOYEHSKNAQHSDIWJHKDYMODFAYKNYAJUFCQZPAVTZYPJFRDYSDNYMFRKADBTQOBXSNWDQYHBSLMTDZUJECURIEBZPNRBMAQNNGXGHAWTOKAKOAVPDEAOEPSZHGNISBHVLIDRMNAFBHGPBYRJEPKLOOYJYXEOSWCOGEEWJDPKQXEDGUSZSAYWLWQEVFHBTLAFTFZTXQJWEHVRFNTAEQDJVYKSBAFNUGJMBRKINGTSLBIEDCMFOHGICOCKGPZXHLBUWUUTTSBNVQMIEKAOWAANJYYKYIOXYHDKDNVVZOKPJTLKKBJMAEMSVUFKYQTSGXNDQLEAUAIXGOSWCLXFVTAWSQDWDCLARUIQRFRSMBQACKAGLMGYFCCJMTLSOEPJXIIIZSPBXHYFVM'));
*/  
}

  /**
   * Listen to the loadingSub property in the LoadingService class.
   * This drives the display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
    .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((cargando) => {
        if(cargando){
          this.loading = cargando;
          //timeout to avoid blocking UI
          this.timeoutInterval = setTimeout(()=>{
            this.loading = false;
          }, this.timeout)
        } else //delay so it can be seen
          setTimeout(()=>{
            this.loading = cargando;
          }, 1000)
      });
  }

  closestNumbers(numbers: number[]): void {
    let ordered:number[] = numbers.sort((a, b) => a - b);
    let tot:number = ordered.length
    let db = [];
    let diff:number;
    let minDiff:number = Infinity;
    for(let i=0; i<tot-1; i++) {
        diff = ordered[i+1] - ordered [i];
        if(diff<minDiff){
          if(db[diff]) db[diff].push([ordered[i], ordered[i+1]])
          else db[diff] = [[ordered[i], ordered[i+1]]];  
        }
    }
    let tot2 = db.length
    for(let i=0; i<tot2; i++) {
      if(db[i]){
        let tot3 = db[i].length;
        for(let j=0; j<tot3; j++) {
          console.log(db[i][j][0], db[i][j][1])
        }
        break;
      }
    }
 }
  /*
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

abbreviation(a: string, b: string): string {
    // Write your code here
    let tot:number = b.length;
    let base = a.split('');
    let control = [... base]
    control = control.map((a) => {
      return a.toLowerCase()
    })
    let index:number;
    
    for(let i=0; i<tot; i++){
      //first uppercase
      index = base.indexOf(b.charAt(i))
      if(index==-1) //lowercase otherwise
        index = control.indexOf(b.toLowerCase().charAt(i));
      if(index==-1) {
        return 'NO';
      } else {
        control.splice(index, 1)
        base.splice(index, 1);
      }
    }
    base = base.sort();
    console.log(base)
    if(base[0]==base[0].toUpperCase()) return 'NO';
    /*
    
    let tot2 = base.length
    for(var i=0; i<tot2; i++){
      if(base[i] != base[i].toLowerCase()) return 'NO'
    };
    */
    return 'YES';
}

    // Complete the maxSubsetSum function below.
    maxSubsetSum(arr) {
      let output = (arr[0]>arr[1])?arr[0]:arr[1];
      let tot = arr.length;
      let dp = [];
      dp[0] = arr[0];
      dp[1] = Math.max(arr[0], arr[1]);
      for(let i=2; i<tot; i++){
        dp[i] = Math.max(dp[i-1], dp[i-2], dp[i-2]+arr[i], arr[i])
      }
      console.log(dp[dp.length-1])
      return dp[dp.length-1]
    }
}
