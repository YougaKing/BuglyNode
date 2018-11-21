class IssueListFrom {
    status;
    ret;

    isAvailable() {
        return (status === '200') && typeof(obj.ret) !== 'undefined' && typeof(obj.ret.issueList) !== 'undefined';
    }
}

class Ret {
    issueList;
}