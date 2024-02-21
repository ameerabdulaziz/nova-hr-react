import OrganizationChart from '@dabeng/react-orgchart';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import payrollMessages from '../../../messages';
import messages from '../../messages';
import Tree from './Tree';

function TreePopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    chartData,
    onSave,
  } = props;

  const [tree, setTree] = useState(Tree.buildTreeFromArray(chartData));
  useEffect(() => {
    if (isOpen) {
      if (chartData) {
        setTree(Tree.buildTreeFromArray(chartData));
      }
    } else {
      Tree.buildTreeFromArray(null);
    }
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
  };

  const onClickNode = (nodeData) => {
    const node = tree.find(nodeData.id);

    if (node?.disabled) {
      return;
    }

    setTree((prevTree) => {
      const newTree = prevTree.clone();
      newTree.addIsCheckProperty(
        nodeData.id,
        !newTree.find(nodeData.id)?.isCheck
      );
      return newTree;
    });
  };

  const MyNode = ({ nodeData }) => {
    const node = tree.find(nodeData.id);

    return (
      <Button
        variant='text'
        disabled={node?.disabled}
        startIcon={
          node?.isCheck ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
        }
      >
        {nodeData.value}
      </Button>
    );
  };

  const onSaveBtnClick = () => {
    onSave(tree);
    closePopup();
  };

  if (!chartData) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
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
      <DialogTitle>{intl.formatMessage(messages.organizationTree)}</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            '.orgchart ': {
              'ul li .oc-node': {
                '&.selected, &:hover': {
                  backgroundColor: 'transparent',
                },
              },
              '& > ul > li > ul li::before': {
                borderTopColor: '#215a88',
              },
              '& > ul > li > ul li > .oc-node::before, & ul li .oc-node:not(:only-child)::after':
                {
                  backgroundColor: '#215a88',
                },
            },
            '.orgchart-container': {
              height: '500px'
            }
          }}
        >
          <OrganizationChart
            datasource={chartData}
            NodeTemplate={MyNode}
            pan
            zoom
            collapsible={false}
            onClickNode={onClickNode}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={closePopup}>
          {intl.formatMessage(payrollMessages.close)}
        </Button>
        <Button onClick={onSaveBtnClick} variant='contained'>
          {intl.formatMessage(payrollMessages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TreePopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  chartData: PropTypes.object.isRequired,
};

export default injectIntl(TreePopup);
