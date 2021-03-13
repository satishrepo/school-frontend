import React, { useState, useEffect }  from 'react';
import { View, StyleSheet } from 'react-native' 
import { 
	withTheme, Modal, Portal, 
	Text, Button, Provider, TextInput, Chip
} from 'react-native-paper';

const InputModal = (props) => {
	const initReason = {
		reason: '',
		note : ''
	}
	const reasons = ['Sick', 'Leave', 'Medical', 'Unknown', 'Test', 'Abcd']
	const [visible, setVisible] = useState(false);
	const [currentItem, setCurrentItem] = useState(props.item);
	const [absentReasonObj, setAbsentReasonObj] = useState(props.item.absentReason || initReason)
	const theme = props.theme

 	useEffect(() => {
		setCurrentItem(props.item)
	}, [props.item, props.item.rollNo])

	useEffect(() => {
		if((currentItem && !currentItem.isPresent) || props.viewReason) {
			showModal()
		} else {
			hideModal()
		}
	}, [currentItem])


  	const showModal = () => setVisible(true);
  	const hideModal = () => {
	  	
		let absentReason = {
			studentIndex: currentItem.index,
			reason : absentReasonObj
		}
		props.onAbsentReason(absentReason)
	  	setVisible(false)
		setCurrentItem(null)
	}

	const cancelModel = () => {

		setVisible(false)
		// setCurrentItem(null)
	}

	const onChangeReason = (text, field) => {
		setAbsentReasonObj({...absentReasonObj, [field]: text})
	}


  	const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
		<Portal >
			
			<Modal dismissable={false} visible={visible} contentContainerStyle={containerStyle}>
				
				<Text style={styles.heading}>Choose Absent Reason</Text>

				<View style={styles.chipCont}>
					{reasons.map(item => (

						<Chip 
							mode="outlined"
							style={[styles.chip]}
							selected={item === absentReasonObj.reason}
							key={item} 
							onPress={() => onChangeReason(item, 'reason')}>{item}</Chip>

					))}
				</View>
				<TextInput
					label="Note"
					value={absentReasonObj.note}
					multiline={true}
					onChangeText={(text) => onChangeReason(text, 'note')}/>
				{
					props.readOnly ? 
					<Button 
						style={styles.saveButton}
						// icon="content-save-outline" 
						mode="contained" 
						color={theme.colors.accent}
						onPress={cancelModel}>Cancel</Button>
					: <Text></Text>
				}
				{
					!props.readOnly ? 
					<Button 
						style={styles.saveButton}
						// icon="content-save-outline" 
						mode="contained" 
						color={theme.colors.primary}
						disabled={!absentReasonObj.reason && !absentReasonObj.note}
						onPress={hideModal}>Save</Button>
					: <Text></Text>
				}

			</Modal>
		</Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
	chipCont: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingTop: 10,
		paddingBottom: 10,
		flexWrap: 'wrap',
		width: '100%'
	},
	chip: {
		color: 'green',
		margin: 5
	},
	heading : {
		fontWeight: 'bold',
		fontSize: 18
	},
	saveButton: {
		display: 'flex',
		width: '30%',
		alignSelf: 'flex-end',
	}
})

export default withTheme(InputModal);