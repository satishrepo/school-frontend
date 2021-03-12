import React ,{ useState, useEffect }  from 'react';
import { withTheme, Modal, Portal, Text, Button, Provider, TextInput} from 'react-native-paper';

const InputModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [note, setNote] = useState('');
  const theme = props.theme
  
 	useEffect(() => {
		setCurrentItem(props.item)
		if(props.item && props.item.isPresent) {
			hideModal()
		} else {
			showModal()
		}

	}, [props.item])

	useEffect( () => {
		if(!currentItem) {
			hideModal()
		}
	}, [currentItem])


  const showModal = () => setVisible(true);
  const hideModal = () => {
	  	setVisible(false)
		setCurrentItem(null)
	};
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} contentContainerStyle={containerStyle}>
          	<Text>Example Modal.  Click outside this area to dismiss.</Text>
		  	<TextInput
				label="Note"
				value={note}
				multiline={true}
				onChangeText={note => setNote(note)}/>
			<Button 
				icon="camera" 
				mode="contained" 
				color={theme.colors.primary}
				onPress={hideModal}>Save</Button>

        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </Provider>
  );
};

export default withTheme(InputModal);