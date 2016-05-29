import {Pipe, PipeTransform} from 'ionic-angular';

@Pipe({ 
  name: 'clientFilter',
  pure: false 
})
export class ClientFilterPipe implements PipeTransform {
  transform(clients: any[], params: string[]) {
    if(clients == null) { return null; } 
    let query = params[0].toLowerCase(); 
    return clients.filter(client =>
      client.name.toLowerCase().indexOf(query) > -1
      );
  }
}
