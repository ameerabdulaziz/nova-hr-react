import DescriptionIcon from '@mui/icons-material/Description';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../../messages';

function CompetencyPopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    onSave,
    selectedCompetency,
    competencyList,
  } = props;

  const [formInfo, setFormInfo] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const mappedCompetencyList = competencyList.map((item) => {
        const index = selectedCompetency.findIndex(
          (competency) => competency.id === item.id
        );

        if (index !== -1) {
          return {
            ...item,
            isSelect: true,
            totalGrade: selectedCompetency[index].totalGrade,
          };
        }

        return {
          ...item,
          isSelect: false,
          totalGrade: '',
        };
      });

      setFormInfo(mappedCompetencyList);
    }
  }, [isOpen]);

  const onNumericInputChange = (evt, index) => {
    const clonedItems = [...formInfo];
    clonedItems[index].totalGrade = evt.target.value.replace(/[^\d]/g, '');

    setFormInfo(clonedItems);
  };

  const onSkillPopupClose = () => {
    setIsOpen(false);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    onSave(formInfo.filter((item) => item.isSelect));

    setIsOpen(false);
  };

  const onCheckboxChange = (evt, index) => {
    const clonedItems = [...formInfo];
    clonedItems[index].isSelect = evt.target.checked;

    setFormInfo(clonedItems);
  };

  const onAllCheckboxChange = (evt) => {
    setFormInfo((prev) => prev.map((item) => ({ ...item, isSelect: evt.target.checked }))
    );
  };

  const isAllSelect = useCallback(
    () => formInfo.every((item) => item.isSelect),
    [formInfo]
  );

  const isSomeSelect = useCallback(() => {
    const filtered = formInfo.filter((item) => item.isSelect).length;

    return filtered > 0 && filtered < formInfo.length;
  }, [formInfo]);

  return (
    <Dialog
      open={isOpen}
      component='form'
      onSubmit={onFormSubmit}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '80vw',
          maxWidth: '80vw',
        }),
      }}
    >
      <DialogTitle>
        {intl.formatMessage(messages.addOrChangeCompetency)}
      </DialogTitle>

      <DialogContent>
        {formInfo.length > 0 ? (
          <TableContainer>
            <Table size='small' sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 30 }}>
                    <Checkbox
                      checked={isAllSelect()}
                      onChange={onAllCheckboxChange}
                      indeterminate={isSomeSelect()}
                      name='all'
                    />
                  </TableCell>

                  <TableCell>
                    {intl.formatMessage(messages.competencyName)}
                  </TableCell>

                  <TableCell sx={{ width: 150 }}>
                    {intl.formatMessage(messages.totalGrade)}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {formInfo.map((competency, index) => (
                  <TableRow
                    key={competency.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={formInfo[index].isSelect}
                        onChange={(evt) => onCheckboxChange(evt, index)}
                        name='isSelect'
                      />
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {competency.name}
                    </TableCell>
                    <TableCell>
                      <TextField
                        name='totalGrade'
                        value={formInfo[index].totalGrade}
                        required
                        onChange={(evt) => onNumericInputChange(evt, index)}
                        label={intl.formatMessage(messages.totalGrade)}
                        fullWidth
                        disabled={!formInfo[index].isSelect}
                        variant='outlined'
                        size='small'
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Stack
            direction='row'
            sx={{ minHeight: 200 }}
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >
            <Box>
              <DescriptionIcon
                sx={{ color: '#a7acb2', fontSize: 30 }}
              />
              <Typography color='#a7acb2' variant='body1'>
                {intl.formatMessage(messages.noCompetencyFound)}
              </Typography>
            </Box>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onSkillPopupClose}>
          {intl.formatMessage(messages.close)}
        </Button>
        <Button type='submit' variant='contained'>
          {intl.formatMessage(messages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CompetencyPopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  competencyList: PropTypes.array.isRequired,
  selectedCompetency: PropTypes.array.isRequired,
};

export default injectIntl(CompetencyPopup);
